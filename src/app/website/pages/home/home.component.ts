import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Product[] = [];
  public limit = 10;
  public offset = 0;
  public idProduct: string | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadMore();
    this.selectProduct();
  }

  loadMore() {
    this.productService.getAll(this.limit, this.offset)
      .subscribe(data => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      })
  }

  selectProduct() {
    this.route.queryParamMap.subscribe(params => {
      this.idProduct = params.get('product');
    });
  }

}
