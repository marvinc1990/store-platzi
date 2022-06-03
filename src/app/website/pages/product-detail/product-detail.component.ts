import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private idProduct: string | null = null;
  public product: Product | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private storeService: StoreService
  ) { }

  ngOnInit(): void {
    this.loadProductById();
  }

  loadProductById() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.idProduct = params.get('id');
          if (this.idProduct) {
            return this.productService.get(parseInt(this.idProduct));
          } else {
            return [null];
          }
        })
      ).subscribe(data => {
        this.product = data;
      });
  }

  addToShoppingCart(product: Product | null) {
    if(product) {
      this.storeService.addProduct(product);
    }
  }

}
