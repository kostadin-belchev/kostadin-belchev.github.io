import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ProductStartComponent } from './product/product-start/product-start.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './product/profile/profile.component';
import { AdminGuard } from './auth/admin.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
// import { RecipeModule } from './recipe/recipe.module';

const routes: Routes = [
  { path: 'auth', children: [
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent }
  ] },
  { path: 'products', children: [
    { path: '', pathMatch: 'full', component: ProductStartComponent },
    { path: 'create', component: ProductCreateComponent, canActivate: [AuthGuard] },
    { path: 'details/:ownerId/:productId', component: ProductDetailsComponent, canActivate: [AuthGuard] },
    { path: 'edit/:ownerId/:productId', component: ProductEditComponent, canActivate: [AuthGuard] },
    { path: 'list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },

  ]},
  { path: 'adminPanel', component: AdminPanelComponent, canActivate: [AdminGuard] },
  // { path: 'products', loadChildren: () => RecipeModule, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }