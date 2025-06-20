import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListeUsersComponent } from './liste-users/liste-users.component';
import { CreateProduitComponent } from './create-produit/create-produit.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ListCategoryComponent } from './list-category/list-category.component';


export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full" },
    {path : "home", component : HomeComponent },
    {path : "prods", component : ProductsComponent  },
    {path : "login", component : LoginComponent  },
    {path : "register", component : RegisterComponent  },
    {path : "listUsers", component : ListeUsersComponent  },
    {path : "createProduit", component : CreateProduitComponent  },
    {path : "editProduit/:id", component : EditProductComponent  },
    {path : "listCategory", component : ListCategoryComponent  }
    

];
