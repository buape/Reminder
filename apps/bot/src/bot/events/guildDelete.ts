import { Guild } from "discord.js"
import { EventHandler } from "@buape/lib"
import { logger } from "@internal/logger"

export default class GuildDelete extends EventHandler {
	override async run(guild: Guild) {
		logger.info(`Left guild ${guild.name} (${guild.id}) with ${guild.memberCount} members!`)
	}
}
