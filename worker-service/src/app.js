const express = require('express');
const { json } = require('express');
const app = express();
const cors = require('cors');
const fileUpload = require("express-fileupload");
const path = require("path");
const routes = require('./interfaces/routes');
const KafkaProducer = require('./infrastructure/services/kafka-producer');
const KafkaConsumer = require('./infrastructure/services/kafka-consumer');
const config = require('./support/config');

const port = config.port;
const kafkaBootstrapServer = config.kafkaBootstrapServer;

const kafkaProducer = new KafkaProducer(kafkaBootstrapServer);
const kafkaConsumer = new KafkaConsumer(kafkaBootstrapServer);

app.use(cors());
app.use(json());
app.use(fileUpload(config.fileUpload));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('Welcome to Worker Service');
});

routes(app, kafkaProducer);

kafkaConsumer.start();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
