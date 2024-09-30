import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistry, UserResponseDto } from '@libs/models/src/lib/types';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  createUser(userRegistry: UserRegistry): Observable<UserResponseDto> {
    return this.httpClient.post<UserResponseDto>(
      `${this.apiUrl}/api/user/register`,
      userRegistry
    );
  }

  getProfile(): Observable<UserResponseDto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.accessToken()}`,
    });

    return this.httpClient.get<UserResponseDto>(
      `${this.apiUrl}/api/user/profile`,
      {
        headers,
      }
    );
  }
}
