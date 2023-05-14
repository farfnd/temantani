const kafka = require("kafka-node");

class KafkaService {
    constructor(bootstrapServer) {
        this.client = new kafka.KafkaClient({ kafkaHost: bootstrapServer });
        this.producer = new kafka.Producer(this.client);
        this.producer.on("ready", () => {
            console.log("Kafka producer is ready");
        });
    }

    publishMessage(topic, message) {
        const payloads = [
            {
                topic: topic,
                messages: [message],
            },
        ];
        this.producer.send(payloads, (error, data) => {
            if (error) {
                console.error("Error publishing message to Kafka:", error);
            } else {
                console.log("Message published to Kafka:", data);
            }
        });
    }
}

module.exports = KafkaService;
