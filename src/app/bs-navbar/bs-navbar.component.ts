import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from 'src/models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/models/shopping-cart';
import { AngularFireObject } from '@angular/fire/compat/database';
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser!: (AppUser|null);
  cart$!: Observable<ShoppingCart>;
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser=> this.appUser = appUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }
  logout() {
    this.auth.logout();
  }
}
