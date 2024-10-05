import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateRoleDto } from '@libs/models/src/lib/types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  create(name: string): Observable<CreateRoleDto> {
    return this.httpClient.post<CreateRoleDto>(
      `${this.apiUrl}/api/role/create`,
      { name }
    );
  }
}
