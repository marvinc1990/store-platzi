import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = `${environment.URL_API}/api/products`;
  private API_URL_CATEGORY = `${environment.URL_API}/api/categories`;

  constructor(
    private http: HttpClient
  ) { }

  get(id: number) {
    return this.http.get<Product>(`${this.API_URL}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError("Internal Server Error!");
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError("Product Not Found!");
          }
          if (error.status === HttpStatusCode.Conflict) {
            return throwError("Error Conflict!");
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError("Not Authorized!");
          }
          return throwError("Default Error!");
        })
      );
  }

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(this.API_URL, { params });
  }

  getAllByIdCategory(idCategory: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.API_URL_CATEGORY}/${idCategory}/products`, { params });
  }

}
