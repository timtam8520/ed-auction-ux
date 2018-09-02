import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products.list.component';
import { ProductComponent } from './products-list/product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
