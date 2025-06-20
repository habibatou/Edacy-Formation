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
  Ensuite j'ai creer un dossier Model dans le projet avec les different classe : UserLogin, User, Produit et Categorie
  <img width="307" alt="image" src="https://github.com/user-attachments/assets/39887d8e-6da0-4f3c-a0e5-6bda0ba57b42" />

j'ai aussi la classe **GDContext** qui permet d’interagir avec la base de données

