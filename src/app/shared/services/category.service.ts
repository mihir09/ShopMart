import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  categoriesList! : AngularFireList<any>;

  getCategories() {
    this.categoriesList = this.db.list('/categories')
    return this.categoriesList.snapshotChanges().pipe(
      map(changes =>
          changes.map(c => {
            return { id: c.payload.key,
              ...c.payload.val()};
          })
      )
  );
  }
}
