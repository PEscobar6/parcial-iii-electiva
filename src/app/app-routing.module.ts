import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBrandsComponent } from './components/brands/list-brands/list-brands.component';
import { AddEditBrandsComponent } from './components/brands/add-edit-brands/add-edit-brands.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { AddEditProductsComponent } from './components/products/add-edit-products/add-edit-products.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';

const routes: Routes = [
  {path: 'marcas', component: ListBrandsComponent},
  {path: 'marcas/add', component: AddEditBrandsComponent},
  {path: 'marcas/edit/:id', component: AddEditBrandsComponent},

  {path: 'products', component: ListProductsComponent},
  {path: 'products/add', component: AddEditProductsComponent},
  {path: 'products/edit/:id', component: AddEditProductsComponent},

  {path: 'error', component: ErrorNotFoundComponent},
  {path: '**', redirectTo: 'error', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
