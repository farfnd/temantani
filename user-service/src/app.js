const express = require("express");
const { json } = require("express");
const app = express();
const cors = require("cors");
const routes = require("./interfaces/routes");
const EventPublisher = require("./infrastructure/event-publisher.js");
const KafkaProducer = require("./infrastructure/services/kafka-producer.js");
const config = require('./support/config');

const port = config.port;
const kafkaBootstrapServer = config.kafkaBootstrapServer;

const kafkaProducer = new KafkaProducer(kafkaBootstrapServer);
const eventPublisher = new EventPublisher(kafkaProducer);

app.use(cors());
app.use(json());
app.get("/", (req, res) => {
    res.send("Welcome to User Service");
});

routes(app, eventPublisher);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

module.exports = app;
