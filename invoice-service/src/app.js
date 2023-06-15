const express = require('express');
const { json } = require('express');
const app = express();
const cors = require('cors');
const routes = require('./interfaces/routes');
const KafkaConsumer = require('./infrastructure/services/kafka-consumer');

const config = require('./support/config');
const port = config.port;
const kafkaBootstrapServer = config.kafkaBootstrapServer;
const kafkaConsumer = new KafkaConsumer(kafkaBootstrapServer);

app.use(cors());
app.use(json());
app.get('/', (req, res) => {
    res.send('Welcome to Order Service');
});

routes(app);

kafkaConsumer.start();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
