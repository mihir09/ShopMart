import { Component } from '@angular/core';
import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import 'rxjs-compat/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: any;
  product: any = {};
  id;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService){
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.productService.get(this.id).valueChanges().take(1).subscribe(p=> this.product = p);
  }

  save(product: any){
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  cancel(){
    this.router.navigate(['/admin/products']);
  }
}
