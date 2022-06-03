import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { StoreService } from 'src/app/services/store/store.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public countProducts = 0;
  public categories: Category[] = [];
  public user: User | null = null;

  constructor(
    private router: Router,
    private storeService: StoreService,
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    /* Show count products */
    this.storeService.shoppingCart$
      .subscribe(products => {
        this.countProducts = products.length;
      });
    /* Load Categories */
    this.categoryService.getAll()
      .subscribe(data => {
        this.categories = data;
      });
    /* Load user */
    this.authService.user$
      .subscribe(data => {
        this.user = data;
      })
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/home'])
  }

}
