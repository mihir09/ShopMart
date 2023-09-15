import { Component } from '@angular/core';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$: any;

  constructor (private orderService: OrderService){
    this.orderService.getOrders().valueChanges().subscribe(x=> this.orders$ = x);
  }
}
