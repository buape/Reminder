import { ApplicationCommand, BetterClient } from "@buape/lib"
import { colors } from "@internal/config"
import { getReminders } from "@internal/database"
import { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder } from "discord.js"

export default class Command extends ApplicationCommand {
	constructor(client: BetterClient) {
		super("list-reminders", client, {
			description: "Set a reminder",
			options: [
				{
					name: "private",
					description: "Should I reply privately to you?",
					type: ApplicationCommandOptionType.Boolean,
					required: false
				}
			]
		})
	}

	override async run(interaction: ChatInputCommandInteraction) {
		if (!(interaction.inGuild() && interaction.inCachedGuild())) return

		const privateReply = interaction.options.getBoolean("private", false) ?? false
		await interaction.deferReply({ ephemeral: privateReply })
		
		const reminders = await getReminders(interaction.user.id)
		if (reminders.length === 0) return interaction.editReply("You don't have any reminders.")

		const embed = new EmbedBuilder()
			.setTitle("Reminders")
			.setDescription("Here are your reminders:")
			.setColor(colors.primary)
			.addFields(
				reminders.map((reminder) => ({
					name: reminder.message,
					value: `<t:${reminder.time}:D>`,
					inline: true
				}))
			)

		return interaction.editReply({ embeds: [embed] })
	}
}
