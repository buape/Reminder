import { generateEmbed } from "@buape/functions"
import { ApplicationCommand, BetterClient } from "@buape/lib"
import { deleteReminder, getReminder, getReminders } from "@internal/database"
import { ApplicationCommandOptionType, AutocompleteFocusedOption, AutocompleteInteraction, CacheType, ChatInputCommandInteraction } from "discord.js"

export default class Command extends ApplicationCommand {
	constructor(client: BetterClient) {
		super("delete-reminder", client, {
			description: "Delete a reminder",
			options: [
				{
					name: "reminder",
					description: "The reminder to delete",
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
		await interaction.deferReply({ ephemeral: privateReply })
		const reminder = interaction.options.getString("reminder", true)
		const dbReminder = await getReminder(reminder)
		if (!dbReminder) return interaction.reply("That reminder doesn't exist.")

		const deletedReminder = await deleteReminder(reminder)

		return interaction.editReply(
			generateEmbed("success", {
				title: "Reminder Deleted!",
				description: `Your reminder in <t:${deletedReminder.time}:R> has been successfully deleted.`
			}),
		)
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
