
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const usersControlers = {

	getUsers : async ({value}) => {
		return await prisma.users.findMany({
			where : value,
			include: {
        eleves: true,
				professeurs: true,
			}
		})
	},

    getUsersArchive : async ({value}) => {
		return await prisma.usersarchive.findMany({
			where : value,
		})
	},

	insertUsers : async ({value}) => {
		return await prisma.users.create({
			data : value,
			include: {
        eleves: true,
				professeurs: true,
			}
		})
	},

	updateUsers : async ({value}) => {
		return await prisma.users.update({
			where: {
				userId : value.userId
			},
			data : value,
			include: {
        eleves: true,
				professeurs: true,
			}
		})
	},

	deleteUsers: async ({userId}) => {
		return await prisma.users.delete({
			where: {
				userId: userId
			},
			include: {
				eleves: true,
				professeurs: true
			}
		})
	}

}


