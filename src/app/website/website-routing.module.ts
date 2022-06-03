import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: "home",
        component: HomeComponent
      },
      {
        path: "category/:id",
        component: CategoryComponent
      },
      {
        path: "product/:id",
        component: ProductDetailComponent
      },
      {
        path: "profile",
        /*canActivate: [AuthGuard],*/
        component: ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
