
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const matieresControlers = {

	getMatieres : async ({value}) => {
		return await prisma.matieres.findMany({
			where : value,
			include: {
        filieres_has_matieres : {
          include: {
            filieres: true
          }
        },
        professeurs:{
          include : {
            users: true,
          }
        },
				notes: true,
				planning: true,
			}
		})
	},

  getMatieresArchive : async ({value}) => {
		return await prisma.matieresarchive.findMany({
			where : value,
		})
	},

	insertMatieres : async ({value}) => {
		return await prisma.matieres.create({
			data : value,
			include: {
        professeurs:{
          include : {
            users: true,
          }
        },
			}
		})
	},

	updateMatieres : async ({value}) => {
		return await prisma.matieres.update({
			where: {
				matiereId : value.matiereId
			},
			data : value,
			include: {
        filieres_has_matieres : {
          include: {
            filieres: true
          }
        },
        professeurs:{
          include : {
            users: true,
          }
        },
				notes: true,
				planning: true,
			}
		})
	},

	deleteMatieres: async ({matiereId}) => {
		return await prisma.matieres.delete({
			where: {
				matiereId: matiereId
			},
			include: {
        filieres_has_matieres : {
          include: {
            filieres: true
          }
        },
        professeurs:{
          include : {
            users: true,
          }
        },
				notes: true,
				planning: true,
			}
		})
	}

}


