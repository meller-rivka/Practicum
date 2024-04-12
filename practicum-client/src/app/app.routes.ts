import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent) },
    { path: 'employee/all-employees',loadComponent:()=> import("./components/employee-table/employee-table.component").then(c=>c.EmployeeTableComponent)},
    { path: 'employee/add-employee',loadComponent:()=> import("./components/add-employee/add-employee.component").then(c=>c.AddEmployeeComponent)},
    { path: 'employee/edit-employee/:id', loadComponent:()=> import("./components/edit-employee/edit-employee.component").then(c=>c.EditEmployeeComponent)},
    { path: '**', component:NotFoundComponent }
  
   
];
