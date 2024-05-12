import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../Entities/Employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { RoleService } from '../../role.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from "../role/role.component";
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmployeeRole } from '../../Entities/EmployeeRole';
import { DatePipe} from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-edit-employee',
    standalone: true,
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.css'],
    imports: [
        ReactiveFormsModule,AddRoleComponent,
        RoleComponent,MatIconModule,MatButtonModule,MatSlideToggleModule
    ]
})

export class EditEmployeeComponent implements OnInit{
  employee:Employee=new Employee();
  employeeForm!: FormGroup;
  employeeRoles: EmployeeRole[] = [];
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private _service:EmployeeService, 
    private _roleService:RoleService,
    private datePipe:DatePipe,
    public dialog: MatDialog){
    }       

  ngOnInit(): void {
    const id = parseInt(this.router.snapshot.paramMap.get('id') || '0', 10);
     this.employeeForm = this.fb.group({
      tz: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(8)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
      startWork: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      active: [true],
      employeeRoles: this.fb.array([]),
    });
    this.getEmployeeDetails(id);
  }
  
  getEmployeeDetails(id: number): void {
    this._service.getEmployeeById(id).subscribe({
      next: (res: Employee) => {
        this.employee = res;
        this.populateForm();
      }
    });
  }
  
  populateForm(): void {
    this.employeeForm.patchValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      tz: this.employee.tz,
      startWork: this.datePipe.transform(this.employee.startWork, 'yyyy-MM-dd'),
      birthDate: this.datePipe.transform(this.employee.birthDate, 'yyyy-MM-dd'),
      gender: this.employee.gender,
      active: this.employee.active
    });
    const employeeRolesFormArray = this.employeeForm.get('employeeRoles') as FormArray;
    employeeRolesFormArray.clear();

    this.employee.employeeRoles.forEach((role) => {
      employeeRolesFormArray.push(this.fb.control(role));
      this.employeeRoles.push(role);
    });
  }

 
get f(): { [key: string]: AbstractControl } {
  return this.employeeForm.controls;
}

onSubmit(): void {
if (this.employeeForm.valid) {
const updateEmployee = this.employeeForm.value;
this.employee.firstName= updateEmployee.firstName ?? '',
this.employee.lastName= updateEmployee.lastName ?? '',
this.employee.tz= updateEmployee.tz ?? '',
this.employee.startWork=updateEmployee.startWork ? new Date(updateEmployee.startWork) : new Date(),
this.employee.birthDate= updateEmployee.birthDate ? new Date(updateEmployee.birthDate) : new Date(),
this.employee.gender= updateEmployee.gender,
this.employee.active= updateEmployee.active || false
};
this._service.update(this.employee).subscribe({
  next: (res) => {
      console.log(res);
    }
  });
}
  
cancelEdit() {
  this.route.navigate(['employee/all-employees/']);
}
deleteEmpRole(index:number){
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result:any) => {
    if (result.isConfirmed) {
      const employeeRolesFormArray = this.employeeForm.get('employeeRoles') as FormArray;
      employeeRolesFormArray.removeAt(index);
      this.employeeRoles.splice(index, 1);
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your role is safe :)",
        icon: "error"
      });
    }
  });
 

}
editEmpRole(updateEmpRole:EmployeeRole,index:number){
  const dialogRef = this.dialog.open(EditEmployeeComponent, {
    data: {employeeRoles:this.employeeForm.get('employeeRoles')?.value,role:updateEmpRole, dateStart:this.employeeForm.get('startRole')?.value},
  });
  dialogRef.afterClosed().subscribe((result: EmployeeRole) => {
    if (result) {
      const employeeRolesArray = this.employeeForm.get('employeeRoles') as FormArray;
      employeeRolesArray.push(this.fb.control(result));
      this.employeeRoles.push(result);
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
   
  });
}
addEmpRole(): void {
  const dialogRef = this.dialog.open(AddRoleComponent, {
    data: {employeeRoles:this.employeeForm.get('employeeRoles')?.value, dateStart:this.employeeForm.get('startRole')?.value},
  });
  dialogRef.afterClosed().subscribe((result: EmployeeRole) => {
    if (result) {
      const employeeRolesArray = this.employeeForm.get('employeeRoles') as FormArray;
      employeeRolesArray.push(this.fb.control(result));
      this.employeeRoles.push(result);
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
   
  });}
}
