import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, AbstractControl } from '@angular/forms';
import {FormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose, MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { EmployeeRole } from '../../Entities/EmployeeRole';
import { RoleService } from '../../role.service';
import { DateAfterDateValidator } from '../../Validators/DateAfterDateValidator';
import { Role } from '../../Entities/Role';


@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ 
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,MatDatepickerModule
  ],
  templateUrl: './add-and-edit-role.component.html',
  styleUrl: './add-and-edit-role.component.css'
})
export class AddAndEditRoleComponent implements OnInit{
  public roleForm!: FormGroup;
  roles:Role[]=[];
  role:EmployeeRole=new EmployeeRole();
  id!:number;
constructor( private roleService:RoleService,private fb:FormBuilder,private router: ActivatedRoute,
  public dialogRef: MatDialogRef<AddAndEditRoleComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { employeeRoles: EmployeeRole[], dateStart: any },
) {}
  ngOnInit(): void {
    this.getRoles();
     this.id = parseInt(this.router.snapshot.paramMap.get('id') || '0', 10);
     this.roleForm = this.fb.group({
      roleId: ['', Validators.required],
      startRole: ['', [Validators.required, DateAfterDateValidator(this.data?.dateStart)]],
      manager: [false, Validators.required],
    })
    
    console.log(this.id);
    if(this.id!=0){
      this.role=this.data.employeeRoles.find(role=>role.roleId===this.id) || new EmployeeRole();
      this.populateForm();
    }
  }
  populateForm(): void {
    this.roleForm.patchValue({
      roleId: this.role.id,
      startRole: this.role.startRole,
      manager: this.role.manager
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.roleForm.controls;
  }
  getRoles(){
    this.roleService.getRoles().subscribe({
      next:(res)=>{
        console.log(res); 
        this.roles=res
      }
    })
  }
  isExist(roleId:number){
  let existRole=this.data.employeeRoles.some(role=> role.roleId===roleId);
  return existRole ? true : false;
  }
saveDialog(){
  let newRole:EmployeeRole=this.roleForm.value;
  if(this.id==0)
  this.dialogRef.close(newRole);
}
closeDialog(): void {
  this.dialogRef.close();
}
}
