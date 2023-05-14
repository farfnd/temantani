class EventPublisher {
    constructor(kafkaService) {
        this.kafkaService = kafkaService;
    }

    async publish(event) {
        console.log("Publishing event to Kafka");
        const message = JSON.stringify(event);
        const topic = "user-topic";

        try {
            this.kafkaService.publishMessage(topic, message);
            console.log("Event published successfully");
        } catch (error) {
            console.error("Error publishing event:", error);
            throw error;
        }
    }
}

module.exports = EventPublisher;
