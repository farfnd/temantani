const Kafka = require('../kafka');
const useCases = require("../../application/use-cases/index.js");
const repositories = require("../../domain/repositories/index.js");

class KafkaConsumer {
    constructor(bootstrapServer) {
        this.kafka = new Kafka(bootstrapServer);
        this.consumerTopic = 'user-topic';
        this.handleNewUser = this.handleNewUser.bind(this);
    }

    async start() {
        try {
            const consumer = await this.kafka.createConsumer([{ topic: this.consumerTopic }]);
            console.log('Kafka consumer created');
            consumer.on('message', this.handleNewUser);
        } catch (error) {
            console.error('Error setting up Kafka consumer:', error);
        }
    }

    async handleNewUser(message) {
        try {
            console.log('Received message:', message);
            const farmerRepo = repositories.farmerRepository();
            const farmerUseCase = useCases.farmerUseCases(farmerRepo);
            const farmer = await farmerUseCase.createFarmerFromMessage(message);
            if (!farmer) {
                console.log('User does not have the farmer role');
                return;
            }
            console.log('New farmer created');
        } catch (error) {
            console.error('Error creating farmer from message:', error);
        }
    }

}

module.exports = KafkaConsumer;
