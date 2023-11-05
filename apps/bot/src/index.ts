import { ShardingManager } from "discord.js"
import { botName } from "@internal/config"
import { logger } from "@internal/logger"

const manager = new ShardingManager("./dist/src/bot/index.js", {
	token: process.env.DISCORD_TOKEN,
})

logger.info(`Starting ${botName}`)

manager.spawn({
	timeout: -1,
})

manager.on("shardCreate", (shard) => {
	logger.info(`Starting Shard ${shard.id}.`)
	if (shard.id + 1 === manager.totalShards) {
		shard.once("ready", () => {
			setTimeout(() => {
				logger.info("All shards have been started!")
			}, 200)
		})
	}
})
