import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee, GenderEnum } from '../../Entities/Employee';
import { EmployeeService } from '../../employee.service';
import { RoleService } from '../../role.service';
import { Role } from '../../Entities/Role';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoleComponent } from "../add-role/add-role.component";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
    selector: 'app-add-employee',
    standalone: true,
    templateUrl: './add-employee.component.html',
    styleUrl: './add-employee.component.css',
    imports: [AddRoleComponent,ReactiveFormsModule,MatButtonModule,MatIconModule]
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;
  genders = Object.values(GenderEnum);
  roles: Role[] = []; // Assuming you have a list of available roles
  showAdd:boolean=false;
  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,private roleService:RoleService) {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      tz: ['', Validators.required],
      startWork: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      employeeRoles: [[]], // This will hold the selected roles
    });
  }

  ngOnInit(): void {
    this.loadRoles(); // Load available roles
  }

  loadRoles() {
    // Assuming you have a service method to fetch roles from the backend
    this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = this.employeeForm.value;
      this.employeeService.createEmployee(employeeData).subscribe(
        (response: any) => {
        console.log('Employee created successfully:', response);
        // Optionally, you can reset the form after submission
        this.employeeForm.reset();
      }, (error: any) => {
        console.error('Error creating employee:', error);
      });
    } else {
      console.error('Form is invalid.');
    }
  }
  addRole(){
    this.showAdd=true;
  }
}


