
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const campusControlers = {

	getCampus : async ({value}) => {
		return await prisma.campus.findMany({
			where : value,
			include: {
				salles: true
			}
		})
	},

	getCampusArchive : async ({value}) => {
		return await prisma.campusarchive.findMany({
			where : value
		})
	},

	insertCampus : async ({value}) => {
		return await prisma.campus.create({
			data : value,
			include: {
				salles: true
			}
		})
	},

	updateCampus : async ({value}) => {
		return await prisma.campus.update({
			where: {
				campusId : value.campusId
			},
			data : value,
			include: {
				salles: true
			}
		})
	},

	deleteCampus: async ({campusId}) => {
		return await prisma.campus.delete({
			where: {
				campusId: campusId
			},
			include: {
				salles: true
			}
		})
	}

}


