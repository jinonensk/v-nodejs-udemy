const { Router } = require('express')
const router = Router()
const auth = require('../middleware/auth')
const Order = require('../models/order')

router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ 'user.userId': req.user._id }).populate(
      'user.userId',
    )

    const log = {
      isOrder: true,
      title: 'Заказы',
      orders: orders.map((o) => ({
        ...o._doc,
        price: o.courses.reduce((total, course) => {
          return (total += course.count * course.course.price)
        }, 0),
      })),
    }
    console.log('orders', log)

    res.render('orders', {
      isOrder: true,
      title: 'Заказы',
      orders: orders.map((o) => ({
        ...o._doc,
        price: o.courses.reduce((total, course) => {
          return (total += course.count * course.course.price)
        }, 0),
      })),
    })
  } catch (e) {
    console.log(e)
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId').execPopulate()

    const courses = user.cart.items.map((i) => ({
      count: i.count,
      course: { ...i.courseId._doc },
    }))

    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      courses,
    })

    await order.save()
    await req.user.clearCart()

    res.redirect('/orders')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
