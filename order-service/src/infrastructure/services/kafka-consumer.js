const Kafka = require('../kafka');
const handlers = require('../../interfaces/event-handlers');
const config = require('../../support/config');

class KafkaConsumer {
    constructor(bootstrapServer) {
        this.kafka = new Kafka(bootstrapServer);
        this.topicToHandlerMap = {
            [config.kafka.consumer.topic.user]: handlers.userHandler,
            [config.kafka.consumer.topic.product]: handlers.productTopicHandler,
        };
    }

    async start() {
        try {
            const consumer = await this.kafka.createConsumer(
                Object.keys(this.topicToHandlerMap).map(topic => ({ topic }))
            );

            console.log('Kafka consumer created');

            consumer.on('message', (message) => {
                let value;
                try {
                    value = JSON.parse(message.value);
                } catch (error) {
                    console.error('Error parsing message:', error.message);
                    return;
                }
                
                const handler = this.topicToHandlerMap[message.topic];
                if (handler) {
                    handler.handle(value);
                } else {
                    console.log(`No handler found for topic: ${message.topic}`);
                }
            });
        } catch (error) {
            console.error('Error setting up Kafka consumer:', error);
        }
    }
}

module.exports = KafkaConsumer;
