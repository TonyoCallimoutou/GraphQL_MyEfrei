
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const sallesControlers = {

	getSalles : async ({value}) => {
		return await prisma.salles.findMany({
			where : value,
			include: {
				campus: true,
				planning: true,
			}
		})
	}

}

export const sallesControlersAdmin = {

  getSallesArchive : async ({value}) => {
		return await prisma.sallesarchive.findMany({
			where : value,
		})
	},

	insertSalles : async ({value}) => {
		return await prisma.salles.create({
			data : value,
			include: {
				campus: true,
			}
		})
	},

	updateSalles : async ({value}) => {
		return await prisma.salles.update({
			where: {
				salleId : value.salleId
			},
			data : value,
			include: {
				campus: true,
				planning: true,
			}
		})
	},

	deleteSalles: async ({salleId}) => {
		return await prisma.salles.delete({
			where: {
				salleId: salleId
			},
			include: {
				campus: true,
				planning: true,
			}
		})
	}

}


