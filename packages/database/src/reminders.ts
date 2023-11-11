
import db from "../index.js"

export const getReminder = async (id: string) => {
	const reminder = await db.reminder.findUnique({
		where: {
			id,
		},
	})
	return reminder
}

export const getReminders = async (userId: string) => {
	const reminders = await db.reminder.findMany({
		where: {
			userId,
		},
	})
	return reminders
}

export const createReminder = async (userId: string, content: string, timestamp: number, timestring: string, channelId: string) => {
	const reminder = await db.reminder.create({
		data: {
			userId,
			message: content,
			time: timestamp,
			originalTime: timestring,
			channelId,
		},
	})
	return reminder
}

export const editReminder = async (id: string, content: string, timestamp: number, timestring: string) => {
	const reminder = await db.reminder.update({
		where: {
			id,
		},
		data: {
			message: content,
			time: timestamp,
			originalTime: timestring,
		},
	})
	return reminder
}

export const expireReminder = async (id: string) => {
	const reminder = await db.reminder.update({
		where: {
			id,
		},
		data: {
			active: false,
		},
	})
	return reminder
}

export const deleteReminder = async (id: string) => {
	const reminder = await db.reminder.delete({
		where: {
			id,
		},
	})
	return reminder
}