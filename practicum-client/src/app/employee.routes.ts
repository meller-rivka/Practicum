import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { AddAndEditEmployeeComponent } from './components/add-and-edit-employee/add-and-edit-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: '', redirectTo: 'all-employees', pathMatch: 'full' },
    { path: 'all-employees', component:EmployeeTableComponent},
    { path: 'add-employee',component:AddAndEditEmployeeComponent},
    { path: 'edit-employee/:id', component:AddAndEditEmployeeComponent},
  
];
@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ]
  })
  export class EmployeeRoutes { }
  
