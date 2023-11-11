/* eslint-disable max-len */
import { logger } from "@internal/logger"
import { BetterClient } from "@buape/lib"
import Cron from "croner"
import { expireReminder } from "@internal/database"
import db from "@internal/database"

const sendAllReminders = async (client: BetterClient) => {
	const reminders = await db.reminder.findMany({
		where: {
			active: true,
			time: {
				lte: Math.floor(Date.now() / 1000)
			}
		}
	})
	
	console.log("Number of reminders to check:", reminders.length)
	
	reminders.forEach(async (reminder) => {
		if (reminder.time > Math.floor(Date.now() / 1000)) {
			console.log("Reminder in the future, skipping")
			return
		}
	
		try {
			const user = await client.users.fetch(reminder.userId)
			if (!reminder.channelId) await user.send(`:pushpin: **Reminder**: \n\n\`\`\`\n${reminder.message}\n\`\`\`\n\nCreated <t:${Math.floor(Number(reminder.createdAt) / 1000)}:R>.`)
			else {
				const channel = await client.channels.fetch(reminder.channelId)
				if (!channel || !channel.isTextBased()) return
				await channel.send(`<@${reminder.userId}>\n\n:pushpin: **Reminder**: \n\n\`\`\`\n${reminder.message}\n\`\`\`\n\nCreated <t:${Math.floor(Number(reminder.createdAt) / 1000)}:R>, in ${reminder.channelId ? `<#${reminder.channelId}>` : "DMs"}.`)
			}
			await expireReminder(reminder.id)
			console.log("Reminder expired")
		} catch (error) {
			console.error("Error processing reminder:", error)
		}
	})
	
}

const startCron = (client: BetterClient) => {
	Cron("* * * * *", async () => {
		// Every minute
		await sendAllReminders(client).catch((error) => {
			logger.thrownError(error)
		})
	})
}

export { startCron }
