import { EventHandler } from "@buape/lib"
import { logger } from "@internal/logger"
import db from "@internal/database"
import { Guild } from "discord.js"

export default class GuildCreate extends EventHandler {
	override async run(guild: Guild) {
		logger.info(`Joined guild ${guild.name} (${guild.id}) with ${guild.memberCount} members!`)

		await db.guild.upsert({
			where: {
				id: guild.id,
			},
			create: {
				id: guild.id,
				name: guild.name,
			},
			update: {
				name: guild.name,
			},
		})
	}
}
