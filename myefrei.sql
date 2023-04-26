drop database if exists myefrei;
create database myefrei;
use myefrei;

CREATE TABLE Campus (
    campusId INT AUTO_INCREMENT NOT NULL,
	campusName VARCHAR(45) NOT NULL UNIQUE,
    adresse VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (CampusId)
);

CREATE TABLE CampusArchive (
    campusId INT NOT NULL,
	campusName VARCHAR(45) NOT NULL,
    adresse VARCHAR(45) NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (CampusId)
);

CREATE TABLE Salles (
	salleId INT AUTO_INCREMENT NOT NULL,
    campusId INT NOT NULL,
    salleName VARCHAR(45) NOT NULL,
    PRIMARY KEY (salleId),
    UNIQUE KEY (campusId, salleName),
    FOREIGN KEY (campusId) REFERENCES Campus(campusId)
);
CREATE TABLE SallesArchive (
	salleId INT NOT NULL,
    campusId INT NOT NULL,
    salleName VARCHAR(45) NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (salleId)
);

CREATE TABLE Filieres (
	filiereId INT AUTO_INCREMENT NOT NULL,
    filiereName VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (filiereId)
);
CREATE TABLE FilieresArchive (
	filiereId INT NOT NULL,
    filiereName VARCHAR(45) NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (filiereId)
);

CREATE TABLE Classes (
	classeId INT AUTO_INCREMENT NOT NULL,
	filiereId INT NOT NULL,
    className VARCHAR(45) NOT NULL,
    classAnnees DATETIME NOT NULL,
    PRIMARY KEY (classeId),
    UNIQUE KEY (className, classAnnees),
    FOREIGN KEY (filiereId) REFERENCES Filieres(filiereId)
);
CREATE TABLE ClassesArchive (
	classeId INT  NOT NULL,
	filiereId INT NOT NULL,
    className VARCHAR(45) NOT NULL,
    classAnnees DATETIME NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (classeId)
);

CREATE TABLE Users (
	userId INT AUTO_INCREMENT NOT NULL,
	userEmail VARCHAR(45) NOT NULL UNIQUE,
    userName VARCHAR(45) NOT NULL,
    PRIMARY KEY (userId)
);
CREATE TABLE UsersArchive (
	userId INT NOT NULL,
	userEmail VARCHAR(45) NOT NULL,
    userName VARCHAR(45) NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (userId)
);

CREATE TABLE Eleves (
	eleveId INT AUTO_INCREMENT NOT NULL,
    userId INT NOT NULL,
    classeId INT NOT NULL,
    PRIMARY KEY (eleveId),
    UNIQUE KEY (userId, classeId),
    FOREIGN KEY (userId) REFERENCES Users(userId),
    FOREIGN KEY (classeId) REFERENCES Classes(classeId)
);

CREATE TABLE ElevesArchive (
	eleveId INT NOT NULL,
    userId INT NOT NULL,
    classeId INT NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (eleveId)
);

CREATE TABLE Professeurs (
	professeurId INT AUTO_INCREMENT NOT NULL,
    userId INT NOT NULL UNIQUE,
    grade VARCHAR(45) NOT NULL,
    PRIMARY KEY (professeurId),
    FOREIGN KEY (userId) REFERENCES Users(userId)
);

CREATE TABLE ProfesseursArchive (
	professeurId INT NOT NULL,
    userId INT NOT NULL,
    grade VARCHAR(45) NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (professeurId)
);

CREATE TABLE Matieres (
	matiereId INT AUTO_INCREMENT NOT NULL,
	professeurId INT,
    matiereName VARCHAR(45) NOT NULL,
    PRIMARY KEY (matiereId),
    UNIQUE KEY (professeurId, matiereName),
    FOREIGN KEY (professeurId) REFERENCES Professeurs(professeurId) ON DELETE SET NULL
);
CREATE TABLE MatieresArchive (
	matiereId INT NOT NULL,
	professeurId INT,
    matiereName VARCHAR(45) NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (matiereId)
);


CREATE TABLE Filieres_has_matieres (
	filiereId INT NOT NULL,
    matiereId INT NOT NULL,
    PRIMARY KEY (filiereId, matiereId),
    FOREIGN KEY (filiereId) REFERENCES Filieres(filiereId) ON DELETE CASCADE,
    FOREIGN KEY (matiereId) REFERENCES Matieres(matiereId) ON DELETE CASCADE
);

CREATE TABLE Notes (
	noteId INT AUTO_INCREMENT NOT NULL,
    eleveId INT NOT NULL,
    matiereId INT NOT NULL,
    note FLOAT NOT NULL,
    PRIMARY KEY (noteId),
    FOREIGN KEY (eleveId) REFERENCES Eleves(eleveId),
    FOREIGN KEY (matiereId) REFERENCES Matieres(matiereId)
);

CREATE TABLE NotesArchive (
	noteId INT NOT NULL,
    eleveId INT NOT NULL,
    matiereId INT NOT NULL,
    note FLOAT NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (noteId)
);

CREATE TABLE Planning (
	planningId INT AUTO_INCREMENT NOT NULL,
	classeId INT NOT NULL,
	matiereId INT NOT NULL,
    salleId INT NOT NULL,
    dateDebut DATETIME NOT NULL,
    dateFin DATETIME NOT NULL,
    PRIMARY KEY (planningId),
    FOREIGN KEY (classeId) REFERENCES Classes(classeId),
    FOREIGN KEY (matiereId) REFERENCES Matieres(matiereId),
    FOREIGN KEY (salleId) REFERENCES Salles(salleId)
);
CREATE TABLE PlanningArchive (
	planningId INT NOT NULL,
	classeId INT NOT NULL,
	matiereId INT NOT NULL,
    salleId INT NOT NULL,
    dateDebut DATETIME NOT NULL,
    dateFin DATETIME NOT NULL,
    deleted_at DATETIME NOT NULL DEFAULT NOW(),
    PRIMARY KEY (planningId)
);



DELIMITER $$
CREATE TRIGGER Campus_delete_trigger 
	BEFORE DELETE ON Campus
	FOR EACH ROW
	BEGIN
    
		DELETE FROM Salles WHERE campusId = old.campusId;

		INSERT INTO CampusArchive(campusId, campusName, adresse )
			VALUES(old.campusId, old.campusName, old.adresse);
	END $$

DELIMITER $$
CREATE TRIGGER Salles_delete_trigger 
	BEFORE DELETE ON Salles
	FOR EACH ROW
	BEGIN
		DELETE FROM Planning WHERE salleId = old.salleId;

		INSERT INTO SallesArchive(salleId, campusId, salleName )
			VALUES(old.salleId, old.campusId, old.salleName);
	END $$

DELIMITER $$ 
CREATE TRIGGER Filieres_delete_trigger 
	BEFORE DELETE ON Filieres
	FOR EACH ROW
	BEGIN
		DELETE FROM Classes WHERE filiereId = old.filiereId;
        
		INSERT INTO FilieresArchive(filiereId, filiereName)
			VALUES(old.filiereId, old.filiereName);
	END $$

DELIMITER $$
CREATE TRIGGER Classes_delete_trigger 
	BEFORE DELETE ON Classes
	FOR EACH ROW
	BEGIN
		DELETE FROM Eleves WHERE classeId = old.classeId;
		DELETE FROM Planning WHERE classeId = old.classeId;
        
		INSERT INTO ClassesArchive(classeId, filiereId, className, classAnnees)
			VALUES(old.classeId, old.filiereId, old.className, old.classAnnees);
	END $$

DELIMITER $$
CREATE TRIGGER Users_delete_trigger 
	BEFORE DELETE ON Users
	FOR EACH ROW
	BEGIN
		DELETE FROM Eleves WHERE userId = old.userId;
		DELETE FROM Professeurs WHERE userId = old.userId;
        
		INSERT INTO UsersArchive(userId, userEmail, userName)
			VALUES(old.userId, old.userEmail, old.userName);
	END $$

DELIMITER $$
CREATE TRIGGER Eleves_delete_trigger 
	BEFORE DELETE ON Eleves
	FOR EACH ROW
	BEGIN
		DELETE FROM Notes WHERE eleveId = old.eleveId;
        
		INSERT INTO ElevesArchive(eleveId, userId, classeId)
			VALUES(old.eleveId, old.userId, old.classeId);
	END $$

DELIMITER $$
CREATE TRIGGER Professeurs_delete_trigger 
	BEFORE DELETE ON Professeurs
	FOR EACH ROW
	BEGIN
		INSERT INTO ProfesseursArchive(professeurId, userId, grade)
			VALUES(old.professeurId, old.userId, old.grade);
	END $$

DELIMITER $$
CREATE TRIGGER Matieres_delete_trigger 
	BEFORE DELETE ON Matieres
	FOR EACH ROW
	BEGIN
		DELETE FROM Notes WHERE matiereId = old.matiereId;
		DELETE FROM Planning WHERE matiereId = old.matiereId;
        
		INSERT INTO MatieresArchive(matiereId, professeurId, matiereName)
			VALUES(old.matiereId, old.professeurId, old.matiereName);
	END $$

DELIMITER $$
CREATE TRIGGER Notes_delete_trigger 
	BEFORE DELETE ON Notes
	FOR EACH ROW
	BEGIN
		INSERT INTO NotesArchive(noteId, eleveId, matiereId, note)
			VALUES(old.noteId, old.eleveId, old.matiereId, old.note);
	END $$

DELIMITER $$
CREATE TRIGGER Planning_delete_trigger 
	BEFORE DELETE ON Planning
	FOR EACH ROW
	BEGIN
		INSERT INTO PlanningArchive(planningId, classeId, matiereId, salleId, dateDebut, dateFin)
			VALUES(old.planningId, old.classeId, old.matiereId, old.salleId, old.dateDebut, old.dateFin);
	END $$