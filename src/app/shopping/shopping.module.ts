import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
// import { PaymentDetailsComponent } from './components/payment-details/payment-details.component';

// import { NgxStripeModule } from 'ngx-stripe';
import { OrderDetailsComponent } from './components/order-details/order-details.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    ProductFilterComponent,
    CheckOutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    // PaymentDetailsComponent,
    OrderDetailsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path:'products', component: ProductsComponent},
      { path:'shopping-cart', component: ShoppingCartComponent},
      { path:'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
      { path:'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
      { path:'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard]},
      { path:'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard] }

    ]),
    // NgxStripeModule.forChild(),
  ]
})
export class ShoppingModule { }
