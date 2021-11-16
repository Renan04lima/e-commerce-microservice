require('dotenv').config()
const express = require('express')
const env = require('env-var')

const { auth } = require('./middlewares/auth.js')
const OrdersController = require('./controllers/order.js')

const port = env.get('PORT').required().asString()
const app = express()
const ordersController = new OrdersController()

app.use(express.json())
app.post('/orders', auth, ordersController.handle.bind(ordersController))
app.listen(port, () => {
  console.log(`Express API http://localhost:${port}`)
})
