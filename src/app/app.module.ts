import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthService } from './auth.service';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { UserService } from './user.service';
import { AdminAuthGuardService as AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';


@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    ProductsComponent,
    ShoppingCartComponent,
    AdminProductsComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot([
      { path:'', component: HomeComponent},
      { path:'products', component: ProductsComponent},
      { path:'login', component: LoginComponent},
      { path:'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
      { path:'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, ]},
      { path:'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, ]},
      { path:'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, ]},
      // { path:'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard]},

    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CategoryService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
