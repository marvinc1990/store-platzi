import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = `${environment.URL_API}/api/users`;

  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<User[]>(this.API_URL);
  }

}
