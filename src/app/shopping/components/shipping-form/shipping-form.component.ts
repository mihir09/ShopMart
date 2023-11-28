import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'app/shared/models/order';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCart } from 'app/shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy{
  @Input('cart') cart!: ShoppingCart;
  shipping = <any>{};
  userId!: string;
  userSubscription!: Subscription;

  constructor( private router: Router,
    private authService: AuthService,
    private orderService: OrderService){}

  async placeOrder(){
    let order = new Order(this.userId, this.shipping, this.cart, this.cart.totalPrice, this.cart.totalItemsCount);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key])
  }

  async ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user=> this.userId = user!.uid);
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
