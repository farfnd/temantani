const kafka = require('kafka-node');

class Kafka {
    constructor(bootstrapServer) {
        this.client = new kafka.KafkaClient({ kafkaHost: bootstrapServer });
    }

    async createProducer() {
        console.log('Creating Kafka producer');
        const producer = new kafka.Producer(this.client);
        await new Promise((resolve, reject) => {
            producer.on('ready', () => {
                console.log('Kafka producer is ready');
                resolve(producer);
            });
            producer.on('error', (error) => {
                console.error('Error connecting to Kafka producer:', error);
                reject(error);
            });
        });
        return producer;
    }

    createConsumer(topics) {
        console.log('Creating Kafka consumer');
        const consumer = new kafka.Consumer(this.client, topics);
        consumer.on('ready', () => {
            console.log('Kafka consumer is ready');
        });
        consumer.on('error', (error) => {
            console.error('Error connecting to Kafka consumer:', error);
        });
        return consumer;
    }
}

module.exports = Kafka;
