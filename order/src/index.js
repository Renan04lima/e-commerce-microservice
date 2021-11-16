const express = require('express')
const { Kafka } = require('kafkajs')
const CognitoExpress = require('cognito-express')
class OrdersController {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'ecommerce_microservice',
      brokers: ['localhost:9092']
    })
  }

  async handle(req, res) {
    var order = req.body
    order.id = Math.floor(Date.now() / 1000)
    order.status = 'PENDING_PAYMENT'

    await this.#sendMessage(order)

    return res.json({ order, message: 'Request made successfully. We are reviewing your payment. You will receive information shortly.' })
  }

  async #sendMessage(order) {
    const producer = this.kafka.producer()
    await producer.connect()
    await producer.send({
      topic: 'RECEIVE_ORDER',
      messages: [
        { value: JSON.stringify(order) },
      ],
    })
    await producer.disconnect()
  }
}

const app = express()

const auth = express.Router()
const cognitoExpress = new CognitoExpress({
  region: 'us-east-1',
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: 'id',
  tokenExpiration: 3600000
})
auth.use(function (req, res, next) {
  let idToken = req.headers.authorization
  if (!idToken) return res.status(401).send({ message: 'ID Token missing from header' })

  const [bearer, realToken] = idToken.split(' ')
  if (!/Bearer/.test(bearer)) {
    return res.status(401).send({ message: 'token unformat' })
  }
  cognitoExpress.validate(realToken, function (err, response) {
    console.error(err, response)
    if (err) return res.status(401).send(err)
    res.locals.user = response
    next()
  })
})
app.use(express.json())
const ordersController = new OrdersController()
app.post('/orders', auth, ordersController.handle.bind(ordersController))
const port = 3001
app.listen(port, () => {
  console.log(`Express API http://localhost:${port}`)
})
