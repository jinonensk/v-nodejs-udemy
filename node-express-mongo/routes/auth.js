const { Router } = require('express')
const bcrypt = require('bcryptjs')
var nodemailer = require('nodemailer')
const router = Router()

const User = require('../models/user')
const regEmail = require('../emails/registration')

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sashanesasha1991@gmail.com',
    pass: 'nesasha1991',
  },
})

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true,
    loginError: req.flash('loginError'),
    registerError: req.flash('registerError'),
  })
})

router.get('/logout', async (req, res) => {
  // req.session.isAuthenticated = false
  // res.render('/auth/login#login')
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password)
      console.log('areSame', areSame)

      if (areSame) {
        req.session.user = candidate
        req.session.isAuthenticated = true
        req.session.save((err) => {
          if (err) {
            throw err
          }
          res.redirect('/')
        })
      } else {
        req.flash('loginError', 'Неверный пароль')
        res.redirect('/auth/login#login')
      }
    } else {
      req.flash('loginError', 'Такого пользователя не существует')
      res.redirect('/auth/login#login')
    }
  } catch (e) {
    console.log(e)
  }
})

router.post('/register', async (req, res) => {
  try {
    const { email, password, repeat, name } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      req.flash('registerError', 'Пользователь с таким email уже существует')
      res.redirect('/auth/login#register')
    } else {
      const hashPassword = await bcrypt.hash(password, 10)
      const user = new User({
        email,
        name,
        password: hashPassword,
        cart: { items: [] },
      })
      await user.save()
      res.redirect('/auth/login#login')
      await transporter.sendMail(regEmail(email), function (error, info) {
        if (error) {
          console.log('Email error', error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
