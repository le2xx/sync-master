import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export type UserLogin = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = signal<boolean>(false);

  private tokenKey = 'access_token';

  constructor(private httpClient: HttpClient) {
    this.isLogin.set(!!localStorage.getItem(this.tokenKey));
  }

  login(userLogin: UserLogin) {
    return this.httpClient
      .post<any>('http://localhost:3000/api/auth/login', userLogin)
      .pipe(
        tap({
          next: (response) => {
            localStorage.setItem(this.tokenKey, response.access_token);
            this.isLogin.set(true);
          },
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLogin.set(false);
  }
}
