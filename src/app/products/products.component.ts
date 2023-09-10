import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs-compat/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any = [];
  filteredProducts: any = [];
  category!: string | null;

  constructor(
    route: ActivatedRoute,
    productService: ProductService) { 
    
    productService.getAll().switchMap(products=> {
      this.products=products;
      return route.queryParamMap;
      })
      .subscribe(params=>{
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter((p: any)=> p.category === this.category) : this.products;
      })
  }
}
