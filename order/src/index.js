const express = require('express')
const { Kafka } = require('kafkajs')

class OrdersController {
  constructor() {
    this.kafka = new Kafka({
      clientId: 'ecommerce_microservice',
      brokers: ['localhost:9092']
    })
  }

  async handle(req, res) {
    var order = req.body;
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
app.use(express.json());
const ordersController = new OrdersController()
app.post('/orders', ordersController.handle.bind(ordersController))
const port = 3001
app.listen(port, () => {
  console.log(`Express API http://localhost:${port}`)
})
