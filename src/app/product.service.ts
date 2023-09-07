import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase ) { }

  productsList! : AngularFireList<any>;

  create(product: any){
    return this.productsList.push(product);
  }

  getAll(){
    this.productsList = this.db.list('/products')
    return this.productsList.snapshotChanges().pipe(
      map(changes =>
          changes.map(c => {
            return { id: c.payload.key,
              ...c.payload.val()};
          })
      )
  );
  }

  get(productId: string){
    return this.db.object('/products/' + productId);
  }

  update(productId: string, product: any){
    return this.productsList.update(productId, product);
  }

  delete(productId: string){
    return this.productsList.remove(productId);
  }
}
