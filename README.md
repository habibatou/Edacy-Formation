### Voici le lien de telechargement du projet FRONT GESTION PRODUIT : https://drive.google.com/file/d/1FZHdBb-dbwT3ILA1BRADK3bn4OPvKU3y/view?usp=sharing

# GESTION PRODUITS
Application web de gestion de produits permettant de gérer des produits et leurs catégories.

# Fonctionnalités
On aura :
- une page de connexion et d'inscription des utilisateurs
- gestions de produits (création ,modification et suppression)

# Technologies utilisées

**Langage back-end** : C# / ASP.NET CORE
**Framework ORM** : Entity Framework Core
**Base de donnees** : SQL SERVER
**Front-end** : Angular 19
**Authentification** : ASP.NET Identity / JWT
## Pour la partie Back-end 
  j'ai eu a creer un projet ASP.CORE Empty, installer les dependances suivant :
- Microsoft EntityFrameworkCore.Design
- Microsoft EntityFrameworkCore.SqlServer
- Microsoft EntityFrameworkCore.Tools
- Microsoft EntityFrameworkCore
  Pour le mapping d'objet relationnel , puis creer une base de donnees dans Sql server nomme **GPDatabase**.
  <img width="245" alt="image" src="https://github.com/user-attachments/assets/eabc23a8-1724-4d5b-93e4-cfcd6e458491" />

  Ensuite j'ai creer un dossier Model dans le projet avec les different classe : UserLogin, User, Produit et Categorie
  <img width="307" alt="image" src="https://github.com/user-attachments/assets/39887d8e-6da0-4f3c-a0e5-6bda0ba57b42" />

j'ai aussi la classe **GDContext** qui permet d’interagir avec la base de donnée.
Il faut creer la migration avec la commande **add-migration v1** ensuite faire **update-database** pour les tables soit creer.
<img width="570" alt="image" src="https://github.com/user-attachments/assets/cf986c7f-8bbc-4779-9aa1-a2c4362b6a2b" />
on a utiliser swagger pour l'api et Jwt pour l'authentification

## Pour les tests on a :
--Connexion 
<img width="638" alt="image" src="https://github.com/user-attachments/assets/8de308e5-cf8f-40cc-b2b9-afadcad23e38" />
--Inscription 
<img width="722" alt="image" src="https://github.com/user-attachments/assets/5e781cdf-2ee4-445b-93fc-1602cbc58381" />

--Liste des utilisateur 
<img width="646" alt="image" src="https://github.com/user-attachments/assets/093f8bed-b1ff-423e-ad3e-6639fbe235b6" />
--List des produit
<img width="556" alt="image" src="https://github.com/user-attachments/assets/84b1b11f-6953-4c23-9f6d-62da51cff7c6" />
--Produit par Id
<img width="686" alt="image" src="https://github.com/user-attachments/assets/874ad765-e9f0-42a0-9f35-a4e0cbdbc30f" />

## Pour le Front j'ai utiliser Angular 19 j'ai mis le projet dans la branche **branch1**
<img width="209" alt="image" src="https://github.com/user-attachments/assets/6b6090cb-c24c-4044-905c-5fdca850cdd2" />

--Page de connexion 
<img width="755" alt="image" src="https://github.com/user-attachments/assets/c2c6ae18-7b81-4023-a6c3-83fa6ab6a337" />
--Inscription 
<img width="428" alt="image" src="https://github.com/user-attachments/assets/508b27af-f75b-4753-bc88-4dfd2bf9f287" />
--Creation Produit
<img width="865" alt="image" src="https://github.com/user-attachments/assets/5eb19fef-e36e-435f-a4cc-f707a61bf1a5" />
--Liste des produits
<img width="940" alt="image" src="https://github.com/user-attachments/assets/76f24d7a-e1c3-4ebe-9bc9-8aab86b62c38" />

--Liste des categories
<img width="859" alt="image" src="https://github.com/user-attachments/assets/b569eed0-38d4-4e15-b730-7a563765df6f" />









