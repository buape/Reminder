import { logger } from "@internal/logger"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

app.get("/", (_req, _res) => {
	_res.json({ message: "Hello World!" })
})

app.all("*", (_req, res) => {
	res.redirect("https://kiaibot.com")
})

app.listen(process.env.API_PORT, () => {
	logger.info(`API listening on port ${process.env.API_PORT}`)
})
