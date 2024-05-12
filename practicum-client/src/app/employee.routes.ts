import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export const routes: Routes = [
    { path: '', redirectTo: 'all', pathMatch: 'full' },
    { path: 'all-employees', component:EmployeeTableComponent},
    { path: 'add-employee',component:AddEmployeeComponent},
    { path: 'edit-employee/:id', component:EditEmployeeComponent},
  
];
@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forChild(routes)
    ]
  })
  export class EmployeeRoutes { }
  
