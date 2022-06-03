import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /* Inputs */
  @Input() public products: Product[] = [];
  @Input()
  set idProduct(id: string | null) {
    if (id) {
      this.showDetailProduct(parseInt(id));
    }
  }
  /* Outputs */
  @Output() eventLoadMore = new EventEmitter();
  /* Initialize */
  public isShowDetail = false;
  public productSelected: Product = {
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

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
  }

  addToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
  }

  showDetailProduct(id: number) {
    if (!this.isShowDetail) {
      this.isShowDetail = true;
    }
    this.productService.get(id)
      .subscribe(data => {
        this.productSelected = data;
      }, errorMsg => {
        window.alert(errorMsg);
      });
  }

  closeDetail() {
    if (this.isShowDetail) {
      this.isShowDetail = false;
      this.route.navigate([]);
    }
  }

  onEventloadMore() {
    this.eventLoadMore.emit();
  }

}
