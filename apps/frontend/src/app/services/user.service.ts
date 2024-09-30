import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageKeys } from '@libs/models/src/lib/enums';

export type UserRegistry = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createUser(userRegistry: UserRegistry) {
    return this.httpClient.post<any>(
      'http://localhost:3000/api/user/register',
      userRegistry
    );
  }

  getProfile() {
    const token = localStorage.getItem(LocalStorageKeys.access_token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get('http://localhost:3000/api/user/profile', {
      headers,
    });
  }
}
