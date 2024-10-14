import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from '@libs/models/src/lib/types';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  createProject(
    name: string,
    companyId: string,
    description: string
  ): Observable<Project> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.accessToken()}`,
    });

    return this.httpClient.post<Project>(
      `${this.apiUrl}/api/project/create`,
      { name, companyId, description },
      { headers }
    );
  }

  getMyProjects(): Observable<Project[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.accessToken()}`,
    });
    return this.httpClient.get<Project[]>(`${this.apiUrl}/api/project/my`, {
      headers,
    });
  }
}
