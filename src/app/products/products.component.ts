import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/products/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products: Product[] = null;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
