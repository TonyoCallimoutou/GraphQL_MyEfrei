
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
	}

}

export const usersControlersAdmin = {
	
	getUsersArchive : async ({value}) => {
		return await prisma.usersarchive.findMany({
			where : value,
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


