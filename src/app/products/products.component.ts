import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs-compat/add/operator/switchMap';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products: any = [];
  filteredProducts: any = [];
  category!: string | null;
  cart$!: Observable<ShoppingCart>;
  // subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { 

  }

  async ngOnInit(){
    // this.subscription = (await this.shoppingCartService.getCart()).subscribe(
    //   cart => this.cart = cart)
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();

  }

  private populateProducts(){
    this.productService
    .getAll()
    .switchMap(products=> {
      this.products=products;
      return this.route.queryParamMap;
    })
    .subscribe(params=>{
        this.category = params.get('category');
        this.applyFilter();
    })
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter((p: any)=> p.category === this.category) : this.products;
  }

  // ngOnDestroy(): void {
  //     this.subscription.unsubscribe();
  // }
}
