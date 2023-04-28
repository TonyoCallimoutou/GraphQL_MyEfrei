use myefrei;
	
INSERT INTO Campus (campusName, adresse) 
	VALUES
	("Republique","30-32 Av. de la République, 94800 Villejuif"),
	("Gorki","136 bis Bd Maxime Gorki, 94800 Villejuif"),
	("EXT","VISIO");
    
INSERT INTO Salles (CampusId, salleName) 
	VALUES
    (3, "VISIO"),
    (1,"A001"),
    (1,"A002"),
    (1,"A003"),
    (1,"A004"),
    (1,"A101"),
    (1,"A102"),
    (1,"B001"),
    (1,"B002"),
    (1,"B003"),
    (1,"B004"),
    (1,"B101"),
    (1,"B102"),
    (2,"G001"),
    (2,"G002"),
    (2,"G003"),
    (2,"G004"),
    (2,"G101"),
    (2,"G102"),
    (2,"H001"),
    (2,"H002"),
    (2,"H003"),
    (2,"H004"),
    (2,"H101"),
    (2,"H102");
    
    
INSERT INTO Filieres (filiereName) 
	VALUES
    ("MASTERE DEV MANAGER FULL STACK"),
    ("MASTERE CYBERSECURITE"),
    ("BACHELOR DEVELOPPEMENT WEB");

INSERT INTO Classes (filiereId, className, classAnnees) 
	VALUES
    (1,"X-MAS-DEV-1-1", '2021-09-01'),
    (1,"X-MAS-DEV-1-1", '2022-09-01'),
    (1,"X-MAS-DEV-1-2", '2022-09-01'),
    (2,"X-MAS-CYBER-1-1", '2022-09-01'),
    (2,"X-MAS-CYBER-1-2", '2022-09-01'),
    (3,"X-BAC-DEV-1-1", '2022-09-01'),
    (3,"X-BAC-DEV-1-2",'2022-09-01');
    
INSERT INTO Users (userEmail, password , userName)
	VALUES
    ('tonyo@email.com', 'password','Tonyo'),
    ('simon@email.com', 'password','Simon'),
    ('anouar@email.com', 'password','Anouar'),
    ('hugo@email.com', 'password','Hugo'),
    ('melvin@email.com', 'password','Bissor Melvin'),
    ('alexandre@email.com', 'password','Carbonneau Alexandre');
    
INSERT INTO Eleves (userId, classeId) 
	VALUES
    (1,1),
    (2,1),
    (2,2),
    (3,1),
    (3,2),
    (4,1);
    
INSERT INTO Professeurs (userId, grade)
	VALUES
    (5, "niveau 2"),
    (6, "niveau 2");
    
INSERT INTO Matieres (professeurId, matiereName)
	VALUES
    (1, "GraphQL"),
    (2, "Communication"),
    (2, "Anglais");	
    
INSERT INTO Filieres_has_matieres (filiereId, matiereId)
	VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 2),
    (3, 3);
    
INSERT INTO Notes (eleveId, matiereId, note)
	VALUES
    (1, 1, 20),
    (2, 1, 19.5),
    (3, 1, 19.5),
    (4, 1, 19.5),
    (1, 2, 20),
    (2, 2, 19.5),
    (3, 2, 19.5),
    (4, 2, 19.5);
    
INSERT INTO Planning (classeId, matiereId, salleId, dateDebut, dateFin)
	VALUES
    (1, 1, 3, '2023-04-26 09:00:00', '2023-04-26 13:00:00'),
    (1, 1, 3, '2023-04-26 14:00:00', '2023-04-26 17:30:00');
    
    