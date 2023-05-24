const express = require('express');
const { json } = require('express');
const app = express();
const cors = require('cors');
const kafka = require('kafka-node');
const routes = require('./interfaces/routes');
const KafkaProducer = require('./infrastructure/services/kafka-producer');
const KafkaConsumer = require('./infrastructure/services/kafka-consumer');

require('dotenv').config();
const port = process.env.PORT || 4000;
const kafkaBootstrapServer = process.env.KAFKA_BOOTSTRAP_SERVER;

const kafkaProducer = new KafkaProducer(kafkaBootstrapServer);
const kafkaConsumer = new KafkaConsumer(kafkaBootstrapServer);

app.use(cors());
app.use(json());
app.get('/', (req, res) => {
    res.send('Welcome to Inventory Service');
});

routes(app, kafkaProducer);

kafkaConsumer.start();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
