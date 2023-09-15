import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/models/order';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ShoppingCart } from 'src/models/shopping-cart';

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
    let order = new Order(this.userId, this.shipping, this.cart);
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
