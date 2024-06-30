import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { Employee } from '../../Entities/Employee';
import { EmployeeService } from '../../employee.service';
import { Role } from '../../Entities/Role';
import { AddAndEditRoleComponent } from "../add-and-edit-role/add-and-edit-role.component";
@Component({
    selector: 'app-add-employee',
    standalone: true,
    templateUrl: './add-employee.component.html',
    styleUrl: './add-employee.component.css',
    imports: [AddAndEditRoleComponent,ReactiveFormsModule,MatButtonModule,MatIconModule]
})
export class AddEmployeeComponent implements OnInit{
  employeeForm!: FormGroup;
  roles: Role[] = []; // Assuming you have a list of available roles
  constructor(private formBuilder: FormBuilder, 
              private route: Router,
              private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tz: ['', Validators.required],
      startWork: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: [1, Validators.required],
      employeeRoles: [[]],
      active:[true],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;
      const gender=employeeData.gender;
      console.log('Employee data:', employeeData);
      console.log('Employee gender:', typeof(gender));
      if(typeof(gender)==='string'){
        employeeData.gender=parseInt(gender);
      }
      console.log('Employee gender:', typeof(employeeData.gender));
      this.employeeService.addEmployee(employeeData).subscribe({
        next:(response: any) => {
          console.log('Employee created successfully:', response);
          this.toAllEmployees();
        },
        error:(error: any) => {
          console.error('Error creating employee:', error);
        }
      });
    } else {
      console.error('Form is invalid.');
    }
  }
  toAllEmployees() {
    this.route.navigate(['employee/all-employees/']);
  }
}


