import { BetterClient } from "@buape/lib"
import * as config from "@internal/config"
import { DebugType, logger } from "@internal/logger"

const client = new BetterClient({
	clientOptions: {
		allowedMentions: { parse: ["users"] },
		intents: config.intents,
	},
	accessSettings: config.accessSettings,
	supportServer: "https://go.buape.com/discord"
})

client.login().catch((error) => {
	logger.debug(JSON.stringify(config, null, 2), DebugType.GENERAL)
	logger.thrownError(error)
})

process.on("uncaughtException", (err) => {
	logger.thrownError(err)
})
