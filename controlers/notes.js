
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const notesControlers = {

	getNotes : async ({value}) => {
		return await prisma.notes.findMany({
			where : value,
			include: {
        eleves: {
          include: {
            users: true,
          }
        },
				matieres: true,
			}
		})
	},

  getNotesArchive : async ({value}) => {
		return await prisma.notesarchive.findMany({
			where : value,
		})
	},

	insertNotes : async ({value}) => {
		return await prisma.notes.create({
			data : value,
			include: {
        eleves: {
          include: {
            users: true,
          }
        },
				matieres: true,
			}
		})
	},

	updateNotes : async ({value}) => {
		return await prisma.notes.update({
			where: {
				noteId : value.noteId
			},
			data : value,
			include: {
        eleves: {
          include: {
            users: true,
          }
        },
				matieres: true,
			}
		})
	},

	deleteNotes: async ({noteId}) => {
		return await prisma.notes.delete({
			where: {
				noteId: noteId
			},
			include: {
        eleves: {
          include: {
            users: true,
          }
        },
				matieres: true,
			}
		})
	}

}


