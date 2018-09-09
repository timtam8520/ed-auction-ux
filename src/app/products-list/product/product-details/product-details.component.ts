import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product/product.service';
import * as moment from 'moment';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { BidService } from '../../../shared/services/bid/bid.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: Product = null;
  bidForm: FormGroup;
  loading = false;
  submitted = false;
  error = null;

  MIN_BID_DIFF = 0.01;

  timeLeft = moment.duration(0);
  intervalRefresh = 1000;
  interval = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private bidService: BidService
  ) { }

  ngOnInit() {
    this.getProduct();
  }

  createBidForm() {
    this.bidForm = this.formBuilder.group({
      bidPrice: ['', [Validators.required, Validators.min(this.latestPrice + this.MIN_BID_DIFF)]]
    });
  }

  onBid() {
    this.submitted = true;

    // stop if the form is invalid or the auction has ended
    if (this.bidForm.invalid || !this.productAuctionOpen) {
      return;
    }

    const bidPrice = this.bidForm.controls.bidPrice.value;
    this.bidService.placeBid(this.product.productId, bidPrice)
      .subscribe(
        res => {
          console.log(res);
          this.submitted = false;
          this.ngOnInit();
        },
        err => this.error = err
      );
  }

  getProduct() {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.productService.getProductById(productId).subscribe(p => {
      this.product = p;
      this.createBidForm();
      this.countdown();
    });
  }

  get latestPrice() {
    return this.product.latestProductBidPrice || this.product.initialProductPrice;
  }

  get productAuctionOpen() {
    return this.timeLeft.asSeconds() > 0;
  }

  countdown() {
    const auctionCloseTime = moment(this.product.productAuctionCloseTime);
    let currentTime = moment(Date.now());
    this.timeLeft = moment.duration(auctionCloseTime.diff(currentTime));

    this.interval = setInterval(() => {
      currentTime = moment(Date.now());
      this.timeLeft = moment.duration(auctionCloseTime.diff(currentTime));
      if (this.timeLeft.asSeconds() < 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

}
