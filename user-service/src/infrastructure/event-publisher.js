module.exports = class EventPublisher {
    constructor(kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    async publish(event) {
        const message = {
            topic: 'user-topic',
            messages: [
                { value: JSON.stringify(event) },
            ],
        };

        await this.kafkaProducer.send(message);
    }
};
