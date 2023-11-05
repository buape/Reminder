import { EventHandler } from "@buape/lib"
import { logger } from "@internal/logger"

export default class ShardError extends EventHandler {
	override async run(error: Error, _shardId: number) {
		logger.thrownError(error, { shard: _shardId })
	}
}
