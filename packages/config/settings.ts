export const guildSettings = [
	{
		name: "XP Cooldown",
		value: "cooldown",
		type: "ms",
		premium: false,
	},
	{
		name: "Minimum XP per message",
		value: "minXp",
		type: "int",
		premium: false,
	},
	{
		name: "Maximum XP per message",
		value: "maxXp",
		type: "int",
		premium: false,
	},
	{
		name: "Reset user XP upon leaving",
		value: "resetXpOnLeave",
		type: "boolean",
		premium: false,
	},
	{
		name: "Reset user XP upon being banned",
		value: "resetXpOnBan",
		type: "boolean",
		premium: false,
	},
	{
		name: "Count slash commands as messages",
		value: "countSlashCommands",
		type: "boolean",
		premium: false,
	},
	{
		name: "Vanity Tag",
		value: "leaderboardVanity",
		type: "string",
		premium: true,
	},
	{
		name: "Logging Channel",
		value: "loggingChannel",
		type: "string",
		premium: false,
	},
	{
		name: "Level Up Channel",
		value: "levelUpChannel",
		type: "string",
		premium: false,
	},
] as const

export const userSettings = [
	{
		name: "Ping on Level Up Message",
		value: "pingOnLevelUp",
		type: "boolean",
	},
	{
		name: "Show Badges",
		value: "showBadges",
		type: "boolean",
	},
] as const

export const fancySettingType = (type: "user" | "guild" | "guildPremium") => {
	switch (type) {
		case "guild":
			return "Guild"
		case "user":
			return "User"
		case "guildPremium":
			return "Guild Premium"
	}
}
