import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../Entities/Employee';
import { EmployeeService } from '../../employee.service';
import { RoleService } from '../../role.service';
import { Role } from '../../Entities/Role';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoleComponent } from "../add-role/add-role.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import e from 'express';
@Component({
    selector: 'app-add-employee',
    standalone: true,
    templateUrl: './add-employee.component.html',
    styleUrl: './add-employee.component.css',
    imports: [AddRoleComponent,ReactiveFormsModule,MatButtonModule,MatIconModule]
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
      employeeRoles: [[]], // This will hold the selected roles
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
          // this.employeeForm.reset();

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


