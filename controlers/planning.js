
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const planningControlers = {

	getPlanning : async ({value}) => {

    let whereConditon = value

    if (value && value.periode) {
      whereConditon = {
        AND : {
          // BASE
          planningId : value.planningId,
          classeId : value.classeId,
          matiereId : value.matiereId,
          salleId : value.salleId,
          
          // Condition periode
          OR : {
            dateDebut : {
              gte: value.periode.dateDebut
            },
            dateFin : {
              lte: value.periode.dateFin
            }
          }
        }
      }
    }

		return await prisma.planning.findMany({
      take: 31,
      where : whereConditon,
      orderBy: {
        dateDebut: 'asc',
      },
			include: {
				classes: true,
				matieres: true,
				salles: {
          include : {
            campus: true, 
          }
        }
			}
		})
	},

	getPlanningArchive : async ({value}) => {
		return await prisma.planningarchive.findMany({
			where : value
		})
	},

	insertPlanning : async ({value}) => {
		return await prisma.planning.create({
			data : value,
			include: {
				classes: true,
				matieres: true,
				salles: {
          include : {
            campus: true, 
          }
        }
			}
		})
	},

	updatePlanning : async ({value}) => {
		return await prisma.planning.update({
			where: {
				planningId : value.planningId
			},
			data : value,
			include: {
				classes: true,
				matieres: true,
				salles: {
          include : {
            campus: true, 
          }
        }
			}
		})
	},

	deletePlanning: async ({planningId}) => {
		return await prisma.planning.delete({
			where: {
				planningId: planningId
			},
			include: {
				classes: true,
				matieres: true,
				salles: {
          include : {
            campus: true, 
          }
        }
			}
		})
	}

}


