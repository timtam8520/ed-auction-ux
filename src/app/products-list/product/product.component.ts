import * as moment from 'moment';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  timeLeft = moment.duration(0);
  intervalRefresh = 1000;
  interval = null;

  constructor() { }

  ngOnInit() {
    this.countdown();
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
