// KafkaConsumer.js
const Kafka = require('../kafka');
const handlers = require('../../interfaces/handlers');

class KafkaConsumer {
    constructor(bootstrapServer) {
        this.kafka = new Kafka(bootstrapServer);
        // Define your consumer topics
        this.userConsumerTopic = 'user-topic';
    }

    async start() {
        try {
            const consumer = await this.kafka.createConsumer([
                { topic: this.userConsumerTopic },
            ]);

            console.log('Kafka consumer created');

            consumer.on('message', (message) => {
                let value;
                try {
                    value = JSON.parse(message.value);
                } catch (error) {
                    console.error('Error parsing message:', error.message);
                    return;
                }
                
                // Call the appropriate topic handler based on the received message's topic
                switch (message.topic) {
                    case this.userConsumerTopic:
                        handlers.userTopicHandler.handle(value);
                        break;
                    default:
                        console.log(`No handler found for topic: ${message.topic}`);
                }
            });
        } catch (error) {
            console.error('Error setting up Kafka consumer:', error);
        }
    }
}

module.exports = KafkaConsumer;