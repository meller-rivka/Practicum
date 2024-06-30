import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { AddAndEditEmployeeComponent } from '../add-and-edit-employee/add-and-edit-employee.component';

const employeeRoutes: Routes = [
  { path: '', redirectTo: 'all-employees', pathMatch: 'full' },
  { path: 'all-employees', component: EmployeeTableComponent},
  { path: 'add-employee', component: AddAndEditEmployeeComponent},
  { path: 'edit-employee/:id', component: AddAndEditEmployeeComponent},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(employeeRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutesModule { }
