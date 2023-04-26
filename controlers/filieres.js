
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const filieresControlers = {

	getFilieres : async ({value}) => {
		return await prisma.filieres.findMany({
			where : value,
			include: {
                classes: true,
				filieres_has_matieres: {
                    include :{
                        matieres: true
                    }
                }
			}
		})
	},

    getFilieresArchive : async ({value}) => {
		return await prisma.filieresarchive.findMany({
			where : value,
		})
	},

	insertFilieres : async ({value}) => {
		return await prisma.filieres.create({
			data : value,
		})
	},

	updateFilieres : async ({value}) => {
		return await prisma.filieres.update({
			where: {
				filiereId : value.filiereId
			},
			data : value,
			include: {
                classes: true,
				filieres_has_matieres: {
                    include :{
                        matieres: true
                    }
                }
			}
		})
	},

	deleteFilieres: async ({filiereId}) => {
		return await prisma.filieres.delete({
			where: {
				filiereId: filiereId
			},
			include: {
                classes: true,
				filieres_has_matieres: {
                    include :{
                        matieres: true
                    }
                }
			}
		})
	}

}


