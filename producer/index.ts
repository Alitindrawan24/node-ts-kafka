import { Kafka, Partitioners } from "kafkajs";

const { KAFKA_HOST } = process.env

const kafka = new Kafka({
    brokers: [KAFKA_HOST ?? ""],
    clientId: "hello-producer"
})

const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
})
await producer.connect()

for (let i = 0; i < 10; i++) {
    console.log("send message to Kafka " + (i + 1))
    await producer.send({
        topic: "helloworld",
        messages: [
            {
                "key": `${i}`,
                "value": `hello world ${i}`,
            }
        ]
    })
}

await producer.disconnect()
