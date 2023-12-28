import { Kafka } from "kafkajs";

const { KAFKA_HOST } = process.env

const kafka = new Kafka({
    "brokers": [KAFKA_HOST ?? ""]
})

const consumer = kafka.consumer({
    "groupId": "node-ts"
})

await consumer.subscribe({
    topic: "helloworld",
    fromBeginning: true,
})

await consumer.connect()
await consumer.run({
    eachMessage: async(record) => {
        const message = record.message
        console.log("Message received: " + message.value?.toString())
    }
})