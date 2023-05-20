// KafkaConsumer.js
const Kafka = require('../kafka');
const handlers = require('../handlers/index');

class KafkaConsumer {
    constructor(bootstrapServer) {
        this.kafka = new Kafka(bootstrapServer);
        // Define your consumer topics
        this.userConsumerTopic = 'user-topic';
        this.landConsumerTopic = 'land-topic';
        this.projectConsumerTopic = 'project-topic';
    }

    async start() {
        try {
            const consumer = await this.kafka.createConsumer([
                { topic: this.userConsumerTopic },
                { topic: this.landConsumerTopic },
                { topic: this.projectConsumerTopic }
            ]);

            console.log('Kafka consumer created');

            consumer.on('message', (message) => {
                // Call the appropriate topic handler based on the received message's topic
                switch (message.topic) {
                    case this.userConsumerTopic:
                        handlers.userTopicHandler.handleNewUser(message);
                        break;
                    case this.landConsumerTopic:
                        handlers.landTopicHandler.handleLand(message);
                        break;
                    case this.projectConsumerTopic:
                        handlers.projectTopicHandler.handleProject(message);
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