import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public idCategory: string | null = null;
  public limit = 10;
  public offset = 0;
  public products: Product[] = [];
  public idProduct: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadProductsByIdCategory();
    this.selectProduct();
  }

  loadProductsByIdCategory() {
    this.activatedRoute.paramMap
      .pipe(
        switchMap(params => {
          this.idCategory = params.get('id');
          if (this.idCategory != null) {
            return this.productService.getAllByIdCategory(this.idCategory, this.limit, this.offset);
          } else {
            return [];
          }
        })
      ).subscribe(data => {
        this.products = data;
      });
  }

  selectProduct() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.idProduct = params.get('product');
    });
  }

}
