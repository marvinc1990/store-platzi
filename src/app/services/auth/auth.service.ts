import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { Auth } from 'src/app/models/auth.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = `${environment.URL_API}/api/auth`;
  private user = new BehaviorSubject<User | null>(null);
  public user$ = this.user.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string) {
    return this.http.post<Auth>(`${this.API_URL}/login`, { email, password })
      .pipe(
        tap(response => this.tokenService.saveToken(response.access_token))
      );
  }

  getProfile() {
    return this.http.get<User>(`${this.API_URL}/profile`)
      .pipe(
        tap(user => this.user.next(user))
      )
  }

  loginAndGet(email: string, password: string) {
    return this.login(email, password)
      .pipe(
        switchMap(() => this.getProfile()),
      )
  }

  logout() {
    this.tokenService.removeToken();
  }

}
