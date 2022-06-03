import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input('product') product: Product = {
    id: 0,
    title: "",
    description: "",
    images: [],
    price: 0,
    category: {
      id: 0,
      name: ""
    }
  };
  @Output() eventAddProduct = new EventEmitter<Product>();
  @Output() eventShowDetail = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    this.eventAddProduct.emit(this.product);
  }

  showDetail() {
    this.eventShowDetail.emit(this.product.id);
  }

}
