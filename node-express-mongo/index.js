const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const session = require('express-session')
const csrf = require('csurf')
const MongoStore = require('connect-mongodb-session')(session)

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
// const User = require('./models/user')
const varMiddleware = require('./middleware/variable')
const userMiddleware = require('./middleware/user')
const errorHandlerModdleware = require('./middleware/error')
const fileMiddleware = require('./middleware/file')
const keys = require('./keys')

// const MONGODB_URI =
//   'mongodb+srv://sasha:q3Q2uLPFdGPet0va@cluster0-xzbk4.mongodb.net/shop'

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  helpers: require('./utils/hbs-helpers'),
})

const store = new MongoStore({
  collection: 'sessions',
  // uri: MONGODB_URI,
  uri: keys.MONGODB_URI,
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.use(async (req, res, next) => {
//   try {
//     const user = await User.findById('5e810847e9b6184734e138ed')
//     req.user = user
//     next()
//   } catch (e) {
//     console.log(e)
//   }
// })

app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.urlencoded({ extended: false }))
app.use(
  session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  }),
)
app.use(fileMiddleware.single('avatar'))
app.use(csrf())
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/courses', coursesRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.use(errorHandlerModdleware)

const PORT = process.env.PROT || 3000

async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    // const candidate = await User.findOne()
    // if (!candidate) {
    //   const user = new User({
    //     email: 's@mail.ru',
    //     name: 'Sasha',
    //     cart: { items: [] },
    //   })
    //   await user.save()
    // }

    app.listen(PORT, () => {
      console.log(`Server is running on prot ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

const password = 'q3Q2uLPFdGPet0va'
