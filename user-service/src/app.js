import express, { json } from "express";
const app = express()
const port = process.env.PORT || 4000;
import cors from 'cors';
import routes from './interfaces/routes/index.js';
import EventPublisher from './infrastructure/event-publisher.js';
import kafka from 'kafka-node';

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS });
const producer = new kafka.Producer(client);

producer.on('ready', () => {
    console.log('Kafka producer is ready');
});

const eventPublisher = new EventPublisher(producer);

app.use(cors());
app.use(json())
app.get("/", (req, res)=>{
    res.send("Hello User Service")
})

routes(app, eventPublisher)

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})