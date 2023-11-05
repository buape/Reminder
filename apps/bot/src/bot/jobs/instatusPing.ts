import { logger } from "@internal/logger"
import Cron from "croner"

const ping = async () => {
	if (process.env.NODE_ENV !== "production") return true

	await fetch("http://localhost:3000", {})
}

const startCron = () => {
	Cron("* * * * *", async () => {
		// Every minute
		await ping().catch((error) => {
			logger.thrownError(error)
		})
	})
}

export { startCron }
