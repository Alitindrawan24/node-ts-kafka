import { Kafka, Partitioners } from "kafkajs";

const kafka = new Kafka({
    brokers: ["localhost:9092"],
    clientId: "hello-producer"
})

const producer = kafka.producer({
    createPartitioner: Partitioners.DefaultPartitioner
})
await producer.connect()

for (let i = 0; i < 10; i++) {
    await producer.send({
        topic: "helloworld",
        messages: [
            {
                "key": `${i}`,
                "value": `hello ${i}`,
            }
        ]
    })
}

await producer.disconnect()
