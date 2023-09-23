import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'app/shared/services/product.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy{

  subscription: Subscription;
  productsData!: MatTableDataSource<any>;
  displayedColumns: string[] = ['title','price','category','update','delete'];
  query: string ='';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.productsData = new MatTableDataSource(products)
      this.productsData.paginator = this.paginator;
      this.productsData.sort = this.sort;
      this.productsData.filterPredicate = (data, filter) =>this.displayedColumns.some(element => {
        if (element === 'price') {
          return data[element] && data[element].toString().includes(filter);
        }
        else{
        return data[element] && data[element].toLowerCase().includes(filter);
        } 
      })
    });
  }

  deleteProduct(productId: string){
      if (!confirm('Are you sure you want to delete this product?')) return;
      return this.productService.delete(productId);
  }

  filterProducts(){
    this.productsData.filter = this.query.toLowerCase();
  }
  onClear(){
    this.query='';
    this.filterProducts();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
