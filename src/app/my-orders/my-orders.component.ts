import { Component, OnInit } from '@angular/core';
import 'rxjs-compat/add/operator/switchMap';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: any;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 

      this.orders$ = this.authService.user$.switchMap(u => this.orderService.getOrdersByUser(u!.uid).valueChanges());
  }
}
