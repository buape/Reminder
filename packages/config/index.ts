import { GatewayIntentBits, PermissionsBitField, PermissionFlagsBits } from "discord.js"
import { AccessSettings } from "@buape/functions"

const botName = "Template"

enum RestrictionType {
	ADMIN = "admin",
}

const accessSettings: AccessSettings = {
	server: process.env.MAIN_GUILD_ID as string,
	roles: {
		admin: ["1080982946170818630", "1080982870513958942"],
	}
}

const colors = {
	primary: 0xd8833b,
	success: 0x57f287,
	warning: 0xfee75c,
	error: 0xed4245,
	invisible: 0x2f3136,
}

const intents = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildWebhooks,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessageReactions,
]

const requiredPermissions = new PermissionsBitField([
	PermissionFlagsBits.EmbedLinks,
	PermissionFlagsBits.SendMessages,
	PermissionFlagsBits.UseExternalEmojis,
])

const embedSpacer = "https://cdn.animeinterlink.com/r/embed_spacer.png"
const emojiSpacer = "<:spacer:991733061182038178>"

export * from "./settings.js"

export { botName, RestrictionType, accessSettings, colors, intents, requiredPermissions, embedSpacer, emojiSpacer }
