import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ProfileComponent } from './profile/profile.component';
import { SavedRecipesComponent } from './saved-recipes/saved-recipes.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { PnfComponent } from './pnf/pnf.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    //http://localhost:4200/admin
    {
        path : "admin", canActivate:[authGuard], loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
    },
    //http://localhost:4200/
    {
        path:"", component:HomeComponent , title:"Home Page"
    },
    {
        path:"about", component:AboutComponent , title:"About"
    },
    {
        path:"contact", component:ContactComponent , title:"Contact"
    },
    {
        path:"login", component:LoginComponent , title:"Login"
    },
    {
        path:"register", component:RegisterComponent , title:"Register"
    },
    {
        path:"all-recipes", component:RecipesComponent , title:"All Recipes"
    },
    {
        path:"profile", canActivate:[authGuard], component:ProfileComponent , title:"Profile"
    },
    {
        path:"saved-recipe",canActivate:[authGuard], component:SavedRecipesComponent , title:"Saved Recipe"
    },
    {
        path:"recipe/:id/view",canActivate:[authGuard], component:ViewRecipeComponent , title:"View Recipe"
    },
    {
        path:"**", component:PnfComponent , title:"Page Not Found"
    }
    
];
