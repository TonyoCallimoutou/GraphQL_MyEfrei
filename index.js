import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema, GraphQLScalarType } from "graphql"
import { campusControlers, campusControlersAdmin } from './controlers/campus.js'
import { sallesControlers, sallesControlersAdmin } from './controlers/salles.js'
import { filieresControlers, filieresControlersAdmin } from './controlers/filieres.js'
import { classesControlers, classesControlersAdmin } from './controlers/classes.js'
import { usersControlers, usersControlersAdmin } from './controlers/users.js'
import { elevesControlers, elevesControlersAdmin } from './controlers/eleves.js'
import { professeursControlers, professeursControlersAdmin } from './controlers/professeurs.js'
import { matieresControlers, matieresControlersAdmin } from './controlers/matieres.js'
import { notesControlers, notesControlersAdmin } from './controlers/notes.js'
import { planningControlers, planningControlersAdmin } from './controlers/planning.js'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { verifyToken } from './utils/auth.js'
import { authControlers } from './controlers/authentification.js'
dotenv.config();


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
    password: String!
    userName : String!
    isAdmin: Boolean!
    eleves : [eleves]
    professeurs : professeurs
  }
  type usersArchive {
    userId : Int!
    userEmail : String!
    password: String!
    userName : String!
    isAdmin: Boolean!
    deleted_at : Date!
  }
  input usersSelect {
    userId : Int
    userEmail : String
    userName : String
    isAdmin: Boolean
  }
  input usersInsert {
    userEmail : String!
    password: String!
    userName : String!
    isAdmin: Boolean
  }   
  input usersLogin {
    userEmail : String!
    password: String!
  }   
  input usersUpdate {
    userId : Int!
    password: String
    userEmail : String
    userName : String
    isAdmin: Boolean
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


  type matieres {
    matiereId : Int!
    professeurId : Int
    matiereName : String!
    filieres_has_matieres : [filieres_has_matieres]
    professeurs : professeurs
    notes : [notes]
    planning : [planning]
  }
  type matieresArchive {
    matiereId : Int!
    professeurId : Int
    matiereName : String!
    deleted_at : Date!
  }
  input matieresSelect {
    matiereId : Int
    professeurId : Int
    matiereName : String
  }
  input matieresInsert {
    professeurId : Int
    matiereName : String!
  }   
  input matieresUpdate {
    matiereId : Int!
    professeurId : Int
    matiereName : String
  } 


  type filieres_has_matieres {
    filiereId : Int
    matiereId : Int
    filieres : filieres 
    matieres : matieres
  }


  type notes {
    noteId : Int!
    eleveId : Int!
    matiereId : Int!
    note : Float!
    eleves : eleves
    matieres : matieres
  }
  type notesArchive {
    noteId : Int!
    eleveId : Int!
    matiereId : Int!
    note : Float!
    deleted_at : Date!
  }
  input notesSelect {
    noteId : Int
    eleveId : Int
    matiereId : Int
  }
  input notesInsert {
    eleveId : Int!
    matiereId : Int!
    note : Float!
  }   
  input notesUpdate {
    noteId : Int!
    eleveId : Int
    matiereId : Int
    note : Float
  }
  
  type planning {
    planningId : Int!
    classeId : Int!
    matiereId : Int!
    salleId : Int!
    dateDebut : Date!
    dateFin : Date!
    classes : classes 
    matieres : matieres 
    salles : salles 
  }
  type planningArchive {
    planningId : Int!
    classeId : Int!
    matiereId : Int!
    salleId : Int!
    dateDebut : Date!
    dateFin : Date!
    deleted_at : Date!
  }
  input periode {
    dateDebut: Date!
    dateFin: Date!
  }
	input planningSelect {
    planningId : Int
    classeId : Int
    matiereId : Int
    salleId : Int
    periode : periode
  }
  input planningInsert {
    classeId : Int!
    matiereId : Int!
    salleId : Int!
    dateDebut : Date!
    dateFin : Date!
  }
  input planningUpdate {
    planningId : Int!
    classeId : Int
    matiereId : Int
    salleId : Int
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



    "Permet de recuperer la liste des matieres"
		getMatieres (value: matieresSelect): [matieres]

    "Permet de recuperer la liste des matieres archivées"
		getMatieresArchive (value: matieresSelect): [matieresArchive]



    "Permet de recuperer la liste des notes"
		getNotes (value: notesSelect): [notes]

    "Permet de recuperer la liste des notes archivées"
		getNotesArchive (value: notesSelect): [notesArchive]



    "Permet de recuperer le planning"
		getPlanning (value: planningSelect): [planning]

    "Permet de recuperer la liste des planning archivés"
		getPlanningArchive (value: planningSelect): [planningArchive]
  }

  type Mutation {

    "Permet de creer un utilisateur"
    registerUser (value: usersInsert!) : users

    "Permet de s'authentifier"
    loginUser (value: usersLogin!) : users

    "Permet de se deconnecter"
    disconnectUser : users

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



    "Permet d'ajouter une matiere"
    insertMatieres (value: matieresInsert!) : matieres

		"Permet de modifier une matiere"
    updateMatieres (value: matieresUpdate!) : matieres

		"Permet de supprimer une matiere"
    deleteMatieres (matiereId: Int!) : matieres


    
    "Permet d'ajouter une notes"
    insertNotes (value: notesInsert!) : notes

		"Permet de modifier une notes"
    updateNotes (value: notesUpdate!) : notes

		"Permet de supprimer une notes"
    deleteNotes (noteId: Int!) : notes



    "Permet d'ajouter un element au planning"
    insertPlanning (value: planningInsert!) : planning

		"Permet de modifier le planning"
    updatePlanning (value: planningUpdate!) : planning

		"Permet de supprimer un element du planning"
    deletePlanning (planningId: Int!) : planning

  }
`)

app.use(cookieParser());


// The root provides a resolver function for each API endpoint

app.use("/graphql", (req,res,next) => {
  var root;

  const { token } = req.cookies;
  if (token) {
    const { user } = verifyToken(token);


    if (user.isAdmin) {
      root = {
    
        ...authControlers,
    
        ...campusControlers,
        ...campusControlersAdmin,
        ...sallesControlers,
        ...sallesControlersAdmin,
        ...filieresControlers,
        ...filieresControlersAdmin,
        ...classesControlers,
        ...classesControlersAdmin,
        ...usersControlers,
        ...usersControlersAdmin,
        ...elevesControlers,
        ...elevesControlersAdmin,
        ...professeursControlers,
        ...professeursControlersAdmin,
        ...matieresControlers,
        ...matieresControlersAdmin,
        ...notesControlers,
        ...notesControlersAdmin,
        ...planningControlers,
        ...planningControlersAdmin
      }
    }
    else {
      root = {
    
        ...authControlers,
    
        ...campusControlers,
        ...campusControlersAdmin,
        ...sallesControlers,
        ...filieresControlers,
        ...classesControlers,
        ...usersControlers,
        ...elevesControlers,
        ...professeursControlers,
        ...matieresControlers,
        ...notesControlers,
        ...planningControlers
      }
    }

  }
  else {
    root = {
      ...authControlers,
    }
  };

  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { req, res }
  })(req, res, next);

});


app.listen(3200, ()=>{
  console.log("Running a GraphQL API server at localhost:3200/graphql")
})
