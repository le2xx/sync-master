import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type UserRegistry = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  createUser(userRegistry: UserRegistry) {
    return this.httpClient.post<any>(
      'http://localhost:3000/api/users/register',
      userRegistry
    );
  }
}
