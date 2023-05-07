import express, { json } from "express";
const app = express()
const port = 4000
import cors from 'cors';
import routes from './interfaces/routes/index.js';

app.use(cors())
app.use(json())
app.get("/", (req, res)=>{
    res.send("Hello World")
})

routes(app)

app.listen(port, ()=>{
    console.log(`server running at http://localhost:${port}`)
})