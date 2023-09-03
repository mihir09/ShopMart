import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase ) { }

  create(product: any){
    return this.db.list('/products').push(product);
  }

  getAll(){
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes =>
          changes.map(c => {
              const data = c.payload.val();
              const id = c.payload.key;
              return { id, data };
          })
      )
  );
  }

  get(productId: string){
    return this.db.object('/products/' + productId);
  }

  update(productId: string, product: any){
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string){
    return this.db.object('/products/' + productId).remove();
  }
}
