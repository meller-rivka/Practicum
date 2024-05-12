import {HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './Entities/Employee';
import { Observable } from 'rxjs';
import { Role } from './Entities/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:5013/api/Role'; 
  roles!:Role[];

  constructor(private http:HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}`);
  }
  getRoleById(roleId:number):Observable<Role>{
    return this.http.get<Role>(`${this.apiUrl}/${roleId}`);
  }
}
