import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private shoppingCart: Product[] = [];

  private behaviorCart = new BehaviorSubject<Product[]>([]);
  public shoppingCart$ = this.behaviorCart.asObservable();

  constructor() { }

  public getShoppingCart() {
    return this.shoppingCart;
  }

  public addProduct(product: Product) {
    this.shoppingCart.push(product);
    this.behaviorCart.next(this.shoppingCart);
  }

  public getTotalCart() {
    return this.shoppingCart.reduce((sum, item) => sum + item.price, 0);
  }

}
