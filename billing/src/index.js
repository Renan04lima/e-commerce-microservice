const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'quickstart_app',
  brokers: ['127.0.0.1:9092']
})

const run = async () => {
  const consumer = kafka.consumer({ groupId: 'invoice' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'PAID_ORDER', fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      var order = JSON.parse(message.value.toString());
      await billOrder(order);
    },
  })
}

const billOrder = async (order) => {
  order.nfe = "nfe_" + order.id + "_2020.xml";
  order.status = "BILLED"
  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'BILLED_ORDER',
    messages: [
      { value: JSON.stringify(order) },
    ],
  })
  await producer.disconnect()
}

run().catch(console.error)
