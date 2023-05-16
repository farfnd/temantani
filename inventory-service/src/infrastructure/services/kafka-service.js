// infrastructure/services/kafka-service.js
const { topics } = require('./config/kafka-config');

class KafkaService {
    constructor(bootstrapServer) {
        this.client = new kafka.KafkaClient({ kafkaHost: bootstrapServer });
        this.producer = new kafka.Producer(this.client);
        this.consumer = new kafka.Consumer(
            this.client,
            topics.consumerTopics.map(topic => ({ topic }))
        );
        
        this.producer.on("ready", () => {
            console.log("Kafka producer is ready");
        });

        this.consumer.on('message', (message) => {
            console.log(`Received message from ${message.topic}:`, message);
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
