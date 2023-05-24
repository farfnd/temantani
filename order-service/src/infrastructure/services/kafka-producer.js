const Kafka = require('../kafka');

class KafkaProducer {
    constructor(bootstrapServer) {
        this.kafka = new Kafka(bootstrapServer);
        (async () => this.producer = await this.kafka.createProducer())();
    }

    async publishMessage(topic, message) {
        try {
            const payloads = [
                {
                    topic: topic,
                    messages: [message],
                },
            ];
            producer.send(payloads, (error, data) => {
                if (error) {
                    console.error('Error publishing message to Kafka:', error);
                } else {
                    console.log('Message published to Kafka:', data);
                }
            });
        } catch (error) {
            console.error('Error creating Kafka producer:', error);
        }
    }
}

module.exports = KafkaProducer;
