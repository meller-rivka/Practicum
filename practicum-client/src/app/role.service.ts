import {HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './Entities/Employee';
import { Observable } from 'rxjs';
import { Role } from './Entities/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'https://practicum-server.onrender.com/api/Role'; 


  constructor(private http:HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}`);
  }
  getNameRole(roleId:number){
    let roles!:Role[];
    this.getRoles().subscribe({
      next:(res)=>{
        roles=res;
        const selectedRole = roles.find(role => role.id === roleId);
        return selectedRole ? selectedRole.name : '';
      }
    })
    return '';
    
  }
}
