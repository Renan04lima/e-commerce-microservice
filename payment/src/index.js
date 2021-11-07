const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'ecommerce_microservice',
  brokers: ['localhost:9092']
})

const run = async () => {
  const consumer = kafka.consumer({ groupId: 'pagto' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'RECEIVE_ORDER', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      var order = JSON.parse(message.value.toString());
      await processPayment(order);
    },
  })
}

const processPayment = async (order) => {
  order.status = 'PAID';
  order.payment_id = Math.floor(Date.now() / 1000)
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'PAID_ORDER',
    messages: [
      { value: JSON.stringify(order) },
    ],
  })
  await producer.disconnect()
}

run().catch(console.error)
