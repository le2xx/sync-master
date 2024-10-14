import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company, CreateCompanyDto } from '@libs/models/src/lib/types';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  create(name: string): Observable<CreateCompanyDto> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.accessToken()}`,
    });

    return this.httpClient.post<CreateCompanyDto>(
      `${this.apiUrl}/api/company/create`,
      { name },
      { headers }
    );
  }

  getMyCompanies(): Observable<Company[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.accessToken()}`,
    });

    return this.httpClient.get<Company[]>(`${this.apiUrl}/api/company/my`, {
      headers,
    });
  }
}
