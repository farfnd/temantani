class EventPublisher {
    constructor(kafkaService) {
        this.kafkaService = kafkaService;
        this.topicMapping = {
            UserRegistered: 'user-topic',
            OrderCreated: 'order-topic',
        };
    }

    async publish(event) {
        console.log("Publishing event to Kafka");
        const message = JSON.stringify(event);

        try {
            const topic = this.topicMapping[event.constructor.name];
            console.log("Topic:", topic);
            if (!topic) {
                throw new Error(`No topic mapping found for event: ${event.constructor.name}`);
            }

            this.kafkaService.publishMessage(topic, message);
            console.log("Event published successfully");
        } catch (error) {
            console.error("Error publishing event:", error);
            throw error;
        }
    }
}

module.exports = EventPublisher;
