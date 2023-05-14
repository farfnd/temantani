const express = require("express");
const { json } = require("express");
const app = express();
const cors = require("cors");
const routes = require("./interfaces/routes/index.js");
const EventPublisher = require("./infrastructure/event-publisher.js");
const KafkaService = require("./infrastructure/services/kafka-service.js");

require('dotenv').config();
const port = process.env.PORT || 4000;
const kafkaBootstrapServer = process.env.KAFKA_BOOTSTRAP_SERVER;

const kafkaService = new KafkaService(kafkaBootstrapServer);
const eventPublisher = new EventPublisher(kafkaService);

app.use(cors());
app.use(json());
app.get("/", (req, res) => {
    res.send("Hello User Service");
});

routes(app, eventPublisher);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

module.exports = app;
