import { PrismaClient } from "@prisma/client"
const database = new PrismaClient()

export default database

export * from "@prisma/client"

export * from "./src/getData.js"
