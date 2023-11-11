import { ApplicationCommand, BetterClient } from "@buape/lib"
import { getReminder, getReminders } from "@internal/database"
import { ActionRowBuilder, ApplicationCommandOptionType, AutocompleteFocusedOption, AutocompleteInteraction, CacheType, ChatInputCommandInteraction, ModalActionRowComponentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js"

export default class Command extends ApplicationCommand {
	constructor(client: BetterClient) {
		super("edit-reminder", client, {
			description: "Set a reminder",
			options: [
				{
					name: "reminder",
					description: "The reminder to edit",
					type: ApplicationCommandOptionType.String,
					required: true,
					autocomplete: true
				},
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
		const reminder = interaction.options.getString("reminder", true)
		const dbReminder = await getReminder(reminder)
		if (!dbReminder) return interaction.editReply("That reminder doesn't exist.")

		const modal = new ModalBuilder().setCustomId(`editReminder:${dbReminder.id}:${privateReply}`).setTitle("Edit Reminder")
		const timeInput = new TextInputBuilder()
			.setCustomId("timeInput")
			.setLabel("Time to remind you?")
			.setPlaceholder(`${dbReminder?.originalTime}` ?? "")
			.setStyle(TextInputStyle.Short)

		const contentInput = new TextInputBuilder()
			.setCustomId("contentInput")
			.setLabel("What should I remind you about?")
			.setPlaceholder(`${dbReminder?.message}` ?? "")
			.setStyle(TextInputStyle.Paragraph)

		const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(timeInput)
		const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(contentInput)

		modal.addComponents(firstActionRow, secondActionRow)

		return interaction.showModal(modal)
	}
    
	override async autocomplete(interaction: AutocompleteInteraction<CacheType>, _option: AutocompleteFocusedOption): Promise<void> {
		if (!(interaction.inGuild() && interaction.inCachedGuild())) return

		const reminder = interaction.options.getFocused(true)
		if (reminder.name !== "reminder") return

		const allReminders = await getReminders(interaction.user.id)
		const results = allReminders.filter((r) =>
			r.message.toLowerCase().includes(reminder.value.toLowerCase()) && r.active)

		return interaction.respond(
			results.map((r) => ({
				name: r.message + " - " + r.originalTime,
				value: r.id,
			}))                             
		)
	}
}
