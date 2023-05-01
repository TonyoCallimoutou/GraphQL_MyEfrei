
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const elevesControlers = {

	getEleves : async ({value}) => {
		return await prisma.eleves.findMany({
			where : value,
			include: {
        users: true,
				classes: true,
        notes: true,
			}
		})
	}

}

export const elevesControlersAdmin = {

  getElevesArchive : async ({value}) => {
		return await prisma.elevesarchive.findMany({
			where : value,
		})
	},

	insertEleves : async ({value}) => {
		return await prisma.eleves.create({
			data : value,
			include: {
        users: true,
				classes: true
			}
		})
	},

	updateEleves : async ({value}) => {
		return await prisma.eleves.update({
			where: {
				eleveId : value.eleveId
			},
			data : value,
			include: {
        users: true,
				classes: true,
        notes: true,
			}
		})
	},

	deleteEleves: async ({eleveId}) => {
		return await prisma.eleves.delete({
			where: {
				eleveId: eleveId
			},
			include: {
        users: true,
				classes: true,
        notes: true,
			}
		})
	}

}


