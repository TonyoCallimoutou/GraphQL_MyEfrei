
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const planningControlers = {

	getPlanning : async ({value}) => {

    let whereConditon = {}

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
            AND : {
              dateDebut : {
                gte: value.periode.dateDebut
              },
              dateDebut : {
                lte: value.periode.dateFin
              }
            },
            AND : {
              dateFin : {
                lte: value.periode.dateFin
              },
              dateFin: {
                gte: value.periode.dateDebut
              }
            }
          }
        }
      }
    }
		else {
			whereConditon = value;
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
		let whereConditon = {}

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
            AND : {
              dateDebut : {
                gte: value.periode.dateDebut
              },
              dateDebut : {
                lte: value.periode.dateFin
              }
            },
            AND : {
              dateFin : {
                lte: value.periode.dateFin
              },
              dateFin: {
                gte:value.periode.dateDebut
              }
            }
          }
        }
      }
    }
		else {
			whereConditon = value;
		}

		return await prisma.planningarchive.findMany({
      take: 31,
      where : whereConditon,
      orderBy: {
        dateDebut: 'asc',
      },
		})
	},

	insertPlanning : async ({value}) => {

    let whereConditon = {
      AND : {
        // BASE
        salleId : value.salleId,
        
        // Condition periode
        OR : {
          AND : {
            dateDebut : {
              gte: value.dateDebut
            },
            dateDebut : {
              lte: value.dateFin
            }
          },
          AND : {
            dateFin : {
              lte: value.dateFin
            },
            dateFin: {
              gte:value.dateDebut
            }
          }
        }
      }
    }

    // Liste des planning compris dans la periode
		let listPlanning = await prisma.planning.findMany({
      where : whereConditon,
      orderBy: {
        dateDebut: 'asc',
      },
		})

    // Filter
    let dateFin = new Date(value.dateFin)
    let dateDebut = new Date(value.dateDebut);
    listPlanning.forEach(cours => {
      if (dateFin.getTime() !== cours.dateDebut.getTime() || dateDebut.getTime() === cours.dateFin.getTime()) {
				throw new Error("Salle déja occupé");
      }
    })

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

    let whereConditon = {
      AND : {
        // BASE
        salleId : value.salleId,
        
        // Condition periode
        OR : {
          AND : {
            dateDebut : {
              gte: value.dateDebut
            },
            dateDebut : {
              lte: value.dateFin
            }
          },
          AND : {
            dateFin : {
              lte: value.dateFin
            },
            dateFin: {
              gte:value.dateDebut
            }
          }
        }
      }
    }

    // Liste des planning compris dans la periode
		let listPlanning = await prisma.planning.findMany({
      where : whereConditon,
      orderBy: {
        dateDebut: 'asc',
      },
		})

    // Filter
    let dateFin = new Date(value.dateFin)
    let dateDebut = new Date(value.dateDebut);
    listPlanning.forEach(cours => {
      if (dateFin.getTime() !== cours.dateDebut.getTime() || dateDebut.getTime() === cours.dateFin.getTime()) {
				throw new Error("Salle déja occupé");
      }
    })

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


