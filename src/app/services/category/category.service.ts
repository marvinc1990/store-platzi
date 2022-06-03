import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private API_URL = `${environment.URL_API}/api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<Category[]>(this.API_URL);
  }

}
