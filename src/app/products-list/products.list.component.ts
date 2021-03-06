import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { ProductService } from '../shared/services/product/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products.list.component.html',
  styleUrls: ['./products.list.component.scss']
})
export class ProductsListComponent implements OnInit {
  private products: Product[] = null;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
}
