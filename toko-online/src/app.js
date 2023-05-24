import express, { json } from "express";
const app = express()
const port = process.env.PORT || 4001;
import cors from 'cors';
import routes from './interfaces/routes';
import kafka from 'kafka-node';
import User from './domain/models/User.js';

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS });
const consumer = new kafka.Consumer(client, [{ topic: process.env.KAFKA_TOPIC }], { autoCommit: false });

consumer.on('message', async (message) => {
    const user = new User.create(JSON.parse(message.value));
    await user.save();
});
consumer.on('error', (err) => {
    console.log(err);
});

app.use(cors())
app.use(json())
app.get("/", (req, res)=>{
    res.send("Hello World")
})

routes(app)

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})