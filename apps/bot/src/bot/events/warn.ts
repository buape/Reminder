import { EventHandler } from "@buape/lib"
import { logger } from "@internal/logger"

export default class Warn extends EventHandler {
	override async run(info: string) {
		logger.warn(`Shard ${this.client.shard?.ids[0]} sent a warning: ${info}`)
	}
}
