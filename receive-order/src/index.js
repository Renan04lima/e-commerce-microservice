const express = require('express')
const app = express()
const { Kafka } = require('kafkajs')

app.use(express.json());

const port = 3001

const kafka = new Kafka({
  clientId: 'quickstart_app',
  brokers: ['localhost:9092']
})

app.get('/', (req, res) => {
  res.send('kafka quickstart')
})

app.post('/orders', async (req, res) => {
  var order = req.body;
  order.id = Math.floor(Date.now() / 1000)
  order.status = 'PENDING_PAYMENT'
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'RECEIVE_ORDER',
    messages: [
      { value: JSON.stringify(order) },
    ],
  })
  await producer.disconnect()

  return res.json({ order, message: 'Request made successfully. We are reviewing your payment. You will receive information shortly.' })
})
app.listen(port, () => {
  console.log(`Express API http://localhost:${port}`)
})
