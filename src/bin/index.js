import express from "express"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import morgan from "morgan"
import bodyParser from "body-parser"
import { config } from "dotenv"
import { api } from "../apis"
import { connectDatabase } from "../db"
const app = express()
export async function startServer() {
    await config()
    await Promise.all([
        connectDatabase(process.env.MONGO_URI),
        app.use(cors()),
       
        app.use(bodyParser.urlencoded({ extended: true })),
        app.use(bodyParser.json()),
        app.use(helmet()),
        app.use(compression()),
        app.use("/api", api)
    ])
    app.listen(process.env.PORT, () => {
        console.log(" server start at port", PORT)
    })
    morgan("tiny")
}