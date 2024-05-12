import { Component, Input, Inject, OnInit } from '@angular/core';
import { Role } from '../../Entities/Role';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDialog,MAT_DIALOG_DATA,MatDialogRef,MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogClose} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { EmployeeRole } from '../../Entities/EmployeeRole';
import { RoleService } from '../../role.service';
import { DateAfterDateValidator } from '../../Validators/DateAfterDateValidator';

export interface DialogData {
  roleName: string;
  startRole: string;
  manager: string;
} 

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,MatSelectModule,
    MatDialogClose,MatButtonToggleModule
  ],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit{
  public roleForm!: FormGroup;
  roles:Role[]=[];

constructor( private roleService:RoleService,private fb:FormBuilder,
  public dialogRef: MatDialogRef<AddRoleComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { employeeRoles: EmployeeRole[], dateStart: any },
) {}
  ngOnInit(): void {
    this.getRoles();
    this.roleForm = this.fb.group({
      roleId: ['', Validators.required],
      Admin: ['', Validators.required],
      dateOfStart: ['', Validators.required, DateAfterDateValidator(this.data?.dateStart)],
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.roleForm.controls;
  }
  
getRoles(){
  this.roleService.getRoles().subscribe({
    next:(res)=>{
      this.roles=res
    }
  })
}
isExist(roleId:number){
let existRole=this.data.employeeRoles.some(role=> role.id===roleId);
return existRole ? true : false;
}
saveDialog(){
  let newRole:EmployeeRole=this.roleForm.value;
  this.dialogRef.close(newRole);
}
closeDialog(): void {
  this.dialogRef.close();
}
}
