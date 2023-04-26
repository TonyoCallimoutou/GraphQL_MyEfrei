
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const classesControlers = {

	getClasses : async ({value}) => {
		return await prisma.classes.findMany({
			where : value,
			include: {
				filieres: true,
				eleves: true,
				planning: true,
			}
		})
	},

    getClassesArchive : async ({value}) => {
		return await prisma.classesarchive.findMany({
			where : value,
		})
	},

	insertClasses : async ({value}) => {
		return await prisma.classes.create({
			data : value,
		})
	},

	updateClasses : async ({value}) => {
		return await prisma.classes.update({
			where: {
				classeId : value.classeId
			},
			data : value,
			include: {
				filieres: true,
				eleves: true,
				planning: true,
			}
		})
	},

	deleteClasses: async ({classeId}) => {
		return await prisma.classes.delete({
			where: {
				classeId: classeId
			},
			include: {
				filieres: true,
				eleves: true,
				planning: true,
			}
		})
	}

}


