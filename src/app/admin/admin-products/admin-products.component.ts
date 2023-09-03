import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{

  products!: any[];
  filteredProducts!: any[];
  subscription: Subscription;

  
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = this.filteredProducts = products;});
  }

  deleteProduct(productId: string){
      if (!confirm('Are you sure you want to delete this product?')) return;
      return this.productService.delete(productId);
  }

  filterProducts(query: string){
    this.filteredProducts = (query) ? 
    this.products.filter(p=> p.data.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
