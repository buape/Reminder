import { EventHandler } from "@buape/lib"
import { logger } from "@internal/logger"

export default class Err extends EventHandler {
	override async run(error: Error) {
		logger.thrownError(error)
	}
}
