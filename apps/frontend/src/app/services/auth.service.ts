import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageKeys } from '@libs/models/src/lib/enums';
import { environment } from '../../environments/environment';
import { UserAccess } from '@libs/models/src/lib/types';

export type UserLogin = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin = computed(() => !!this.accessToken());
  accessToken = computed(() => localStorage.getItem(this.tokenKey));
  private apiUrl = environment.apiUrl;

  private tokenKey = LocalStorageKeys.access_token;

  constructor(private httpClient: HttpClient) {}

  login(userLogin: UserLogin): Observable<UserAccess> {
    return this.httpClient
      .post<UserAccess>(`${this.apiUrl}/api/auth/login`, userLogin)
      .pipe(
        tap({
          next: (response) => {
            localStorage.setItem(this.tokenKey, response.accessToken);
          },
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
