import { ApplicationCommand, BetterClient } from "@buape/lib"
import { ActionRowBuilder, ApplicationCommandOptionType, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"

export default class Command extends ApplicationCommand {
	constructor(client: BetterClient) {
		super("reminder", client, {
			description: "Set a reminder",
			options: [
				{
					name: "location",
					description: "Where should I remind you?",
					type: ApplicationCommandOptionType.String,
					required: true,
					choices: [
						{
							name: "Channel (this will only work if you're in a guild)",
							value: "channel"
						},
						{
							name: "DM",
							value: "dm"
						}
					]
				},
				{
					name: "private",
					description: "Should I reply privately to you?",
					type: ApplicationCommandOptionType.Boolean,
					required: false
				},
			]
		})
	}

	override async run(interaction: ChatInputCommandInteraction) {
		const privateReply = interaction.options.getBoolean("private", false) ?? false
		const location = interaction.options.getString("location", true)
		if (location === "channel" && !(interaction.inGuild() && interaction.inCachedGuild())) return interaction.reply("You can't set a reminder in a channel if you're not in a guild.")
		const modal = new ModalBuilder().setCustomId(`createReminder:${privateReply}:${location}`).setTitle("Create Reminder")
		const timeInput = new TextInputBuilder()
			.setCustomId("timeInput")
			.setLabel("Time to remind you?")
			.setPlaceholder("e.g. 1h 30m")
			.setStyle(TextInputStyle.Short)

		const contentInput = new TextInputBuilder()
			.setCustomId("contentInput")
			.setLabel("What should I remind you about?")
			.setPlaceholder("e.g. Have a break, have a KitKat")
			.setStyle(TextInputStyle.Paragraph)

		const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(timeInput)
		const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(contentInput)

		modal.addComponents(firstActionRow, secondActionRow)

		return interaction.showModal(modal)
	}
}
