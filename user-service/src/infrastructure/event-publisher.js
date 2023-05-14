module.exports = class EventPublisher {
    constructor(kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    async publish(event) {
        console.log('Publishing event to Kafka');
        const message = {
            topic: 'user-topic',
            messages: [JSON.stringify(event)],
        };

        try {
            this.kafkaProducer.send([message], (err, data) => {
                if (err) {
                    throw err;
                }
                console.log('Message sent successfully:', data);
            });
        } catch (error) {
            throw error;
        }
    }
};
