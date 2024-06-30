import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe} from '@angular/common';

import Swal from 'sweetalert2';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Employee } from '../../Entities/Employee';
import { EmployeeRole } from '../../Entities/EmployeeRole';
import { RoleComponent } from "../role/role.component";
import { AddAndEditRoleComponent } from '../add-and-edit-role/add-and-edit-role.component';
import { EmployeeService } from '../../employee.service';
import { RoleService } from '../../role.service';

@Component({
    selector: 'app-edit-employee',
    standalone: true,
    templateUrl: './add-and-edit-employee.component.html',
    styleUrls: ['./add-and-edit-employee.component.css'],
    imports: [
        ReactiveFormsModule,AddAndEditRoleComponent,MatInputModule,MatSelectModule,
        RoleComponent,MatIconModule,MatButtonModule,MatSlideToggleModule,MatDatepickerModule
    ]
})

export class AddAndEditEmployeeComponent implements OnInit{
  employee:Employee=new Employee();
  employeeForm!: FormGroup;
  employeeRoles: EmployeeRole[] = [];
  id!:number;
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
     this.id = parseInt(this.router.snapshot.paramMap.get('id') || '0', 10);
     this.employeeForm = this.fb.group({
      tz: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zא-ת ]+$/),Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zא-ת ]+$/),Validators.minLength(2)]],
      startWork: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      active: [true],
      employeeRoles: this.fb.array([]),
    });
    if(this.id!=0){
      this._service.getEmployeeById(this.id).subscribe({
        next: (res: Employee) => {
          this.employee = res;
          console.log(this.employee);

          this.employeeForm.patchValue({
            firstName: res.firstName,
            lastName: res.lastName,
            tz: res.tz,
            startWork:this.datePipe.transform(res.startWork, 'yyyy-MM-dd'),
            birthDate:this.datePipe.transform(res.birthDate, 'yyyy-MM-dd'),
            gender: res.gender === 1 ? 'Male' : 'Female',
            active: res.active
          });
          
          const employeeRolesFormArray = this.employeeForm.get('employeeRoles') as FormArray;
          employeeRolesFormArray.clear();
      
          this.employee.employeeRoles.forEach((role) => {
            employeeRolesFormArray.push(this.fb.control(role));
            this.employeeRoles.push(role);
          });
          // this.populateForm();
        }
      });
    }

      // this.getEmployeeDetails(this.id);
  }

  
  // getEmployeeDetails(id: number): void {
  //   this._service.getEmployeeById(id).subscribe({
  //     next: (res: Employee) => {
  //       this.employee = res;
  //       console.log(this.employee);
  //       this.populateForm();
  //     }
  //   });
  // }
  
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
  const gender = this.employeeForm.value.gender;
  this.employeeForm.value.gender = gender === 'Male' ? 1 : 2;
  this.employeeForm.value.startWork = this.datePipe.transform(this.employeeForm.value.startWork, 'yyyy-MM-dd');
  this.employeeForm.value.birthDate = this.datePipe.transform(this.employeeForm.value.birthDate, 'yyyy-MM-dd');
  if(this.id==0)
    this.onSubmitAdd();
  else{
    if (this.employeeForm.valid) {
      const updateEmployee = this.employeeForm.value;
      const empRolesBeforeSend=updateEmployee.employeeRoles;
      for (let index = 0; index < empRolesBeforeSend.length; index++) {
        (empRolesBeforeSend[index] as EmployeeRole).employeeId=this.employee.id;
        (empRolesBeforeSend[index] as EmployeeRole).id=0;
        (empRolesBeforeSend[index] as EmployeeRole).manager = empRolesBeforeSend[index].manager=='true' ? true : false;
      }
      
      updateEmployee.employeeRoles=empRolesBeforeSend;
      (updateEmployee as Employee).id=this.employee.id;
      this._service.update(updateEmployee).subscribe({
        next: (res) => {
            console.log(res);
            this.toAllEmployees();
          }
        });
      }
      else{
        Object.keys(this.employeeForm.controls).forEach(key => {
          const controlErrors: ValidationErrors = this.employeeForm.get(key)?.errors as ValidationErrors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
            });
          }
        });
      }
  }


}
onSubmitAdd() {
  if (this.employeeForm.valid) {
    const employeeData: Employee = this.employeeForm.value;
    const gender=employeeData.gender;
    console.log('Employee data:', employeeData);
    console.log('Employee gender:', typeof(gender));
    if(typeof(gender)==='string'){
      employeeData.gender=parseInt(gender);
    }
    console.log('Employee gender:', typeof(employeeData.gender));
    this._service.addEmployee(employeeData).subscribe({
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
  const dialogRef = this.dialog.open(AddAndEditRoleComponent, {
    data: {employeeRoles:this.employeeForm.get('employeeRoles')?.value,role:updateEmpRole, dateStart:this.employeeForm.get('startRole')?.value},
  });
  dialogRef.afterClosed().subscribe((result: EmployeeRole) => {
    if (result) {
      const employeeRolesArray = this.employeeForm.get('employeeRoles') as FormArray;
      employeeRolesArray.at(index).patchValue(result);
      this.employeeRoles[index]=result;
    }
  });
}
addEmpRole(): void {
  const dialogRef = this.dialog.open(AddAndEditRoleComponent, {
    data: {employeeRoles:this.employeeForm.get('employeeRoles')?.value, dateStart:this.employeeForm.get('startRole')?.value},
  });
  dialogRef.afterClosed().subscribe((result: EmployeeRole) => {
    if (result) {
      console.log(result);
      
      const employeeRolesArray = this.employeeForm.get('employeeRoles') as FormArray;
      employeeRolesArray.push(this.fb.control(result));
      this.employeeRoles.push(result);
    }
  });
  }
}
