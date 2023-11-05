import { EventHandler } from "@buape/lib"
import { logger } from "@internal/logger"

export default class ShardResume extends EventHandler {
	override async run(shardId: number, replayedEvents: number) {
		logger.info(`Shard ${shardId} resumed and replayed ${replayedEvents} events!`)
	}
}
