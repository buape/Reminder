import { CloseEvent } from "discord.js"
import { EventHandler } from "@buape/lib"
import { logger } from "@internal/logger"

export default class ShardDisconnect extends EventHandler {
	override async run(event: CloseEvent, shardId: number) {
		logger.info(`Shard ${shardId} disconnected from the gateway with code ${event.code} and will not reconnect.`)
	}
}
