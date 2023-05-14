const express = require('express');
const kafka = require('kafka-node');
const app = express();
app.use(express.json());

require('dotenv').config();
const port = process.env.PORT || 3000;
const kafkaBootstrapServer = process.env.KAFKA_BOOTSTRAP_SERVER;
const kafkaTopic = process.env.KAFKA_TOPIC;

const client = new kafka.KafkaClient({ kafkaHost: kafkaBootstrapServer });
const consumer = new kafka.Consumer(client, [{ topic: kafkaTopic }]);

consumer.on("ready", () => {
    console.log("Kafka consumer is ready");
});
consumer.on('message', async (message) => {
    console.log('Received message:', message);
});
consumer.on('error', (err) => {
    console.log(err);
});

app.listen(port, () => {
    console.log('Listening on port 3000');
})