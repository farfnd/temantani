const express = require("express");
const { json } = require("express");
const app = express();
const cors = require("cors");
const routes = require("./interfaces/routes/index.js");
const EventPublisher = require("./infrastructure/event-publisher.js");
const KafkaProducer = require("./infrastructure/services/kafka-producer.js");

require('dotenv').config();
const port = process.env.PORT || 4000;
const kafkaBootstrapServer = process.env.KAFKA_BOOTSTRAP_SERVER;

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
