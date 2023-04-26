import { PrismaClient } from '@prisma/client'
import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema, GraphQLScalarType } from "graphql"
import { campusControlers } from './controlers/campus.js'
import { sallesControlers } from './controlers/salles.js'
import { filieresControlers } from './controlers/filieres.js'
import { classesControlers } from './controlers/classes.js'
import { usersControlers } from './controlers/users.js'
import { elevesControlers } from './controlers/eleves.js'
import { professeursControlers } from './controlers/professeurs.js'

var app = express()
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
	scalar Date

  type campus {
    campusId : Int!
    campusName : String !
    adresse :  String!
    salles : [salles]
  }
  type campusArchive {
    campusId : Int!
    campusName : String!
    adresse :  String!
    deleted_at : Date!
  }
  input campusSelect {
    campusId : Int
    campusName : String 
    adresse :  String
  }
  input campusInsert {
    campusName : String! 
    adresse :  String!
  }   
  input campusUpdate {
    campusId : Int!
    campusName : String
    adresse :  String
  } 


  type salles {
    salleId : Int!
    campusId : Int!
    salleName : String!
    planning : [planning]
    campus : campus
  }
  type sallesArchive {
    salleId : Int!
    campusId : Int!
    salleName : String!
    deleted_at : Date!
  }
  input sallesSelect {
    salleId : Int
    campusId : Int
    salleName : String
  }
  input sallesInsert {
    campusId : Int!
    salleName : String!
  }   
  input sallesUpdate {
    salleId : Int!
    campusId : Int
    salleName : String
  }


  type filieres {
    filiereId : Int!
    filiereName : String!
    classes : [classes]
    filieres_has_matieres : [filieres_has_matieres]
  }
  type filieresArchive {
    filiereId : Int!
    filiereName : String!
    deleted_at : Date!
  }
  input filieresSelect {
    filiereId : Int
    filiereName : String
  }
  input filieresInsert {
    filiereName : String!
  }   
  input filieresUpdate {
    filiereId : Int!
    filiereName : String!
  }


  type classes {
    classeId : Int!
    filiereId : Int!
    className : String!
    classAnnees : Date!
    filieres : filieres
    eleves : [eleves]
    planning : [planning]
  }
  type classesArchive {
    classeId : Int!
    filiereId : Int!
    className : String!
    classAnnees : Date!
    deleted_at : Date!
  }
  input classesSelect {
    classeId : Int
    filiereId : Int
    className : String
    classAnnees : Date
  }
  input classesInsert {
    filiereId : Int!
    className : String!
    classAnnees : Date!
  }   
  input classesUpdate {
    classeId : Int!
    filiereId : Int
    className : String
    classAnnees : Date
  } 


  type users {
    userId : Int!
    userEmail : String!
    userName : String!
    eleves : [eleves]
    professeurs : [professeurs]
  }
  type usersArchive {
    userId : Int!
    userEmail : String!
    userName : String!
    deleted_at : Date!
  }
  input usersSelect {
    userId : Int
    userEmail : String
    userName : String
  }
  input usersInsert {
    userEmail : String!
    userName : String!
  }   
  input usersUpdate {
    userId : Int!
    userEmail : String
    userName : String
  } 


  type eleves {
    eleveId : Int!
    userId : Int!
    classeId : Int!
    users : users
    classes : classes
    notes :[notes]
  }
  type elevesArchive {
    eleveId : Int!
    userId : Int!
    classeId : Int!
    deleted_at : Date!
  }
  input elevesSelect {
    eleveId : Int
    userId : Int
    classeId : Int
  }
  input elevesInsert {
    userId : Int!
    classeId : Int!
  }   
  input elevesUpdate {
    eleveId : Int!
    userId : Int
    classeId : Int
  } 


  type professeurs {
    professeurId : Int!
    userId : Int!
    grade : String!
    matieres : [matieres]
    users : users
  }
  type professeursArchive {
    professeurId : Int!
    userId : Int!
    grade : String!
    deleted_at : Date!
  }
  input professeursSelect {
    professeurId : Int
    userId : Int
    grade : String
  }
  input professeursInsert {
    userId : Int!
    grade : String!
  }   
  input professeursUpdate {
    professeurId : Int!
    userId : Int
    grade : String
  } 




  type filieres_has_matieres {
    filiereId : Int
    matiereId : Int
    filieres : filieres 
    matieres : matieres
  }

  type matieres {
    matiereId : Int
    professeurId : Int
    matiereName : String
    filieres_has_matieres : [filieres_has_matieres]
    professeurs : professeurs
    notes : [notes]
    planning : [planning]
  }

  type notes {
    noteId : Int
    eleveId : Int
    matiereId : Int
    note : Float
    eleves : eleves
    matieres : matieres
  }
  
  type planning {
    planningId : Int
    classeId : Int
    matiereId : Int
    salleId : Int
    dateDebut : Date
    dateFin : Date
    classes : classes 
    matieres : matieres 
    salles : salles 
  }
	input planningSelect {
    classeId : Int!
    dateDebut :  Date!
    dateFin :  Date!
  }
  input planningInput {
    classeId : Int!
    salleId : Int!
    dateDebut : Date!
    dateFin : Date!
  }   

  type Query {
		
		"Permet de recuperer la liste des campus"
		getCampus (value: campusSelect): [campus]

    "Permet de recuperer la liste des campus archivés"
		getCampusArchive (value: campusSelect): [campusArchive]



    "Permet de recuperer la liste des salles"
		getSalles (value: sallesSelect): [salles]

    "Permet de recuperer la liste des salles archivées"
		getSallesArchive (value: sallesSelect): [sallesArchive]



    "Permet de recuperer la liste des filieres"
		getFilieres (value: filieresSelect): [filieres]

    "Permet de recuperer la liste des salles archivées"
		getFilieresArchive (value: filieresSelect): [filieresArchive]



    "Permet de recuperer la liste des classes"
		getClasses (value: classesSelect): [classes]

    "Permet de recuperer la liste des classes archivées"
		getClassesArchive (value: classesSelect): [classesArchive]


    
    "Permet de recuperer la liste des utilisateurs"
		getUsers (value: usersSelect): [users]

    "Permet de recuperer la liste des utilisateurs archivés"
		getUsersArchive (value: usersSelect): [usersArchive]



    "Permet de recuperer la liste des eleves"
		getEleves (value: elevesSelect): [eleves]

    "Permet de recuperer la liste des eleves archivés"
		getElevesArchive (value: elevesSelect): [elevesArchive]



    "Permet de recuperer la liste des professeurs"
		getProfesseurs (value: professeursSelect): [professeurs]

    "Permet de recuperer la liste des professeurs archivés"
		getProfesseursArchive (value: professeursSelect): [professeursArchive]

  }

  type Mutation {

    "Permet d'ajouter un campus"
    insertCampus (value: campusInsert!) : campus

		"Permet de modifier un campus"
    updateCampus (value: campusUpdate!) : campus

		"Permet de supprimer un campus"
    deleteCampus (campusId: Int!) : campus



    "Permet d'ajouter une salle"
    insertSalles (value: sallesInsert!) : salles

		"Permet de modifier une salle"
    updateSalles (value: sallesUpdate!) : salles

		"Permet de supprimer une salle"
    deleteSalles (sallesId: Int!) : salles



    "Permet d'ajouter une filiere"
    insertFilieres (value: filieresInsert!) : filieres

		"Permet de modifier une filiere"
    updateFilieres (value: filieresUpdate!) : filieres

		"Permet de supprimer une filiere"
    deleteFilieres (filiereId: Int!) : filieres



    "Permet d'ajouter une classe"
    insertClasses (value: classesInsert!) : classes

		"Permet de modifier une classe"
    updateClasses (value: classesUpdate!) : classes

		"Permet de supprimer une classe"
    deleteClasses (classeId: Int!) : classes



    "Permet d'ajouter un utilisateur"
    insertUsers (value: usersInsert!) : users

		"Permet de modifier un utilisateur"
    updateUsers (value: usersUpdate!) : users

		"Permet de supprimer un utilisateur"
    deleteUsers (userId: Int!) : users



    "Permet d'ajouter un eleve"
    insertEleves (value: elevesInsert!) : eleves

		"Permet de modifier un eleve"
    updateEleves (value: elevesUpdate!) : eleves

		"Permet de supprimer un eleve"
    deleteEleves (eleveId: Int!) : eleves



    "Permet d'ajouter un professeur"
    insertProfesseurs (value: professeursInsert!) : professeurs

		"Permet de modifier un professeur"
    updateProfesseurs (value: professeursUpdate!) : professeurs

		"Permet de supprimer un professeur"
    deleteProfesseurs (professeurId: Int!) : professeurs

  }
`)



// The root provides a resolver function for each API endpoint
var root = {

	...campusControlers,
  ...sallesControlers,
  ...filieresControlers,
  ...classesControlers,
  ...usersControlers,
  ...elevesControlers,
  ...professeursControlers,
	

}


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)


app.listen(3200, ()=>{
  console.log("coucou")
})
