const config = require('../support/config');

class EventPublisher {
    constructor(producer) {
        this.producer = producer;
        this.topicMapping = {
            OrderCreated: config.kafka.producer.topic.order,
            OrderPaid: config.kafka.producer.topic.order,
            OrderCancelled: config.kafka.producer.topic.order,
        };
    }

    async publish(event) {
        console.log("Publishing event");
        const message = JSON.stringify(event);

        try {
            const topic = this.topicMapping[event.constructor.name];
            console.log("Topic:", topic);
            if (!topic) {
                throw new Error(`No topic mapping found for event: ${event.constructor.name}`);
            }

            this.producer.publishMessage(topic, message);
            console.log("Event published successfully");
        } catch (error) {
            console.error("Error publishing event:", error);
            throw error;
        }
    }
}

module.exports = EventPublisher;
