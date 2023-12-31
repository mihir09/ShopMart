import { Component, OnInit } from '@angular/core';
import 'rxjs-compat/add/operator/switchMap';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders: any;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

      this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u!.uid)).subscribe(res=> {this.orders = res});

  }
}
