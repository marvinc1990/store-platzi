import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductsComponent } from './pages/products/products.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LayoutComponent,
    ProductsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    SharedModule
  ]
})
export class CmsModule { }
