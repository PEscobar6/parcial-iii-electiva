import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddEditBrandsComponent } from './components/brands/add-edit-brands/add-edit-brands.component';
import { ListBrandsComponent } from './components/brands/list-brands/list-brands.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { AddEditProductsComponent } from './components/products/add-edit-products/add-edit-products.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddEditBrandsComponent,
    ListBrandsComponent,
    ErrorNotFoundComponent,
    ProgressBarComponent,
    AddEditProductsComponent,
    ListProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
