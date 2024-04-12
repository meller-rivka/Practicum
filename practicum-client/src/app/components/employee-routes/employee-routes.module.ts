import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

const employeeRoutes: Routes = [
  { path: '', redirectTo: 'all-employees', pathMatch: 'full' },
  { path: 'all-employees', component: EmployeeTableComponent},
  { path: 'add-employee', component: AddEmployeeComponent},
  { path: 'edit-employee/:id', component: EditEmployeeComponent},

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(employeeRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutesModule { }
