import { generateEmbed } from "@buape/functions"
import { BetterClient, ModalSubmit } from "@buape/lib"
import timestring from "timestring"

import { ModalSubmitInteraction } from "discord.js"
import { createReminder } from "@internal/database"

export default class Modal extends ModalSubmit {
	constructor(client: BetterClient) {
		super("createReminder", client)
	}

	override async run(interaction: ModalSubmitInteraction) {
		const privateReply = interaction.customId.split(":")[1] === "true"
		const location = interaction.customId.split(":")[2]
		if (!(interaction.inGuild() && interaction.inCachedGuild())) return

		await interaction.deferReply({ ephemeral: privateReply })

		const time = interaction.fields.getTextInputValue("timeInput")
		const content = interaction.fields.getTextInputValue("contentInput")

		let timeMs: number | undefined
		try {
			timeMs = timestring(time) // Returns in seconds.
		} catch (error) {
			return interaction.editReply("That's not a valid time.")
		}
		const timestamp = Math.round((Date.now() + timeMs * 1000) / 1000)
		if (timestamp < Math.floor(Date.now() / 1000)) return interaction.editReply("That time is in the past.")

		const reminder = await createReminder(interaction.user.id, content, timestamp, time, (location === "channel" ? interaction.channel!.id : ""))

		await interaction.editReply(
			generateEmbed("success", {
				title: "Reminder Set!",
				description: `${reminder.message} in <t:${reminder.time}:R>. You'll be reminded in ${reminder.channelId ? `<#${reminder.channelId}>` : "DMs"}.`,
			})
		)
	}
}
