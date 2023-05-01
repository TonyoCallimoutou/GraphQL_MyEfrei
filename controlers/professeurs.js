
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const professeursControlers = {

	getProfesseurs : async ({value}) => {
		return await prisma.professeurs.findMany({
			where : value,
			include: {
        users: true,
				matieres: true,
			}
		})
	}

}


export const professeursControlersAdmin = {
	getProfesseursArchive : async ({value}) => {
		return await prisma.professeursarchive.findMany({
			where : value,
		})
	},

	insertProfesseurs : async ({value}) => {
		return await prisma.professeurs.create({
			data : value,
			include: {
        users: true
			}
		})
	},

	updateProfesseurs : async ({value}) => {
		return await prisma.professeurs.update({
			where: {
				professeurId : value.professeurId
			},
			data : value,
			include: {
        users: true,
				matieres: true,
			}
		})
	},

	deleteProfesseurs: async ({professeurId}) => {
		return await prisma.professeurs.delete({
			where: {
				professeurId: professeurId
			},
			include: {
        users: true,
				matieres: true,
			}
		})
	}

}


