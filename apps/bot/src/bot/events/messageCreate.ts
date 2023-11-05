import { Message } from "discord.js"
import { EventHandler } from "@buape/lib"

export default class MessageCreate extends EventHandler {
	override async run(message: Message) {
		this.client.textCommandHandler.handle(message)
	}
}
