import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/take';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'src/models/shopping-cart';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  
  constructor(private db: AngularFireDatabase) { }
  
  private create(){
    return this.db.list('/shopping-carts/').push({
      dateCreated : new Date().getTime()
    });
  }

  async getCart(): Promise<Observable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId).valueChanges().pipe(map((x:any) => new ShoppingCart(x.items)));
  }

  private getItem(cartId: string, productId: any){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string | null>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    
    let result = await this.create();
    localStorage.setItem('cartId', result.key || 'UniqueCartIdTemp-1');
    return result.key;
  }

  async addToCart(product: any){
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: any){
    this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: any, changeNumber: any){
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId || 'UniqueCartIdTemp-1', product.id);
    item$.snapshotChanges().take(1).subscribe((item) =>{
      item$.update({ product: product, quantity: (item.payload.exists() ? item.payload.exportVal().quantity : 0) + changeNumber});
    });
  }
}
