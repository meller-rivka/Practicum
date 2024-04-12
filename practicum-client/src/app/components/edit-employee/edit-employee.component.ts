import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee, GenderEnum } from '../../Entities/Employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../employee.service';
import { Role } from '../../Entities/Role';
import { RoleService } from '../../role.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from "../role/role.component";
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmployeeRole } from '../../Entities/EmployeeRole';
@Component({
    selector: 'app-edit-employee',
    standalone: true,
    templateUrl: './edit-employee.component.html',
    styleUrls: ['./edit-employee.component.css'],
    imports: [
        ReactiveFormsModule,
        RoleComponent,MatIconModule,MatButtonModule
    ]
})

export class EditEmployeeComponent implements OnInit{
  employee:Employee=new Employee();
  roleId!:number;
  startRole!:Date;
  manager!:boolean;
    employeeForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    tz: ['', Validators.required,Validators.minLength(9)],
    startWork: [new Date()],
    birthDate: [new Date()],
    gender: [GenderEnum.Other],
    employeeRoles: this.formBuilder.array([
      this.formBuilder.group({
      roleName: ['', Validators.required],
      startRole: [new Date(), Validators.required],
      manager: [false]
    })]),
    active: [false]});
  
  selectedRole: { [key: number]: string } = {};
  roles:Role[]=[];
  visible: boolean = false;

  constructor(private formBuilder: FormBuilder, private route: Router,
    private router: ActivatedRoute,private _service:EmployeeService, 
    private _roleService:RoleService,public dialog: MatDialog){}

  get employeeRoles() {
    return this.employeeForm.get('employeeRoles') as FormArray;
  }
 
  createEmployeeRole(myRole: any): FormGroup {
    return this.formBuilder.group({
      roleName: [myRole.roleName, Validators.required],
      startRole: [myRole.startRole, Validators.required],
      manager: [myRole.manager || false]
    });
  }

  addEmployeeRole(): void {
    const control = this.employeeForm.get('employeeRoles') as FormArray;
    control.push(this.createEmployeeRole({ roleName: '', startRole: new Date(), manager: false }));
  }
  editDialog(role:EmployeeRole):void{
    const dialogRef = this.dialog.open(AddRoleComponent, {
      data: {roleId:role.roleId, startRole:role.startRole,manager:role.manager},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      role.roleId=result.roleId;
      role.startRole=result.startRole;
      role.manager=result.manager;
      this.updateOneRole(role);
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddRoleComponent, {
      data: {roleId:this.roleId, startRole:this.startRole,manager:this.manager},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      var employeeRole={
        id:this.employee.employeeRoles[this.employee.employeeRoles.length-1].id*42,
        employeeId:this.employee.id,
        roleId:result.roleId,
        startRole:result.startRole,
        manager:result.manager
      }
      this.employee.employeeRoles.push(employeeRole);

    });
  }
    addEmployeeRoles() {
      this.employeeRoles.push(this.formBuilder.control(''));
    }
   
   ngOnInit():void {
   
    const id = parseInt(this.router.snapshot.paramMap.get('id') || '0', 10);
     this.getEmployeeDetails(id);
    console.log(this.employee);
    this.getRoles();
    console.log(this.roles);
    
}
get f(): { [key: string]: AbstractControl } {
  return this.employeeForm.controls;
}
  onSubmit(): void {
    if (this.employeeForm.valid) {
      const updateEmployee = this.employeeForm.value;
        this.employee.firstName= updateEmployee.firstName ?? '', // אם הערך של updateEmployee.firstName הוא undefined, אז נשים ערך ריק במקום
        this.employee.lastName= updateEmployee.lastName ?? '', // כאן גם נפעיל את האופרטור ?? כדי לוודא שאם updateEmployee.lastName מוגדר, אז נשים את הערך שלו, אחרת נשים ערך ריק
        this.employee.tz= updateEmployee.tz ?? '', // כאן גם נפעיל את האופרטור ?? כדי לוודא שאם updateEmployee.tz מוגדר, אז נשים את הערך שלו, אחרת נשים ערך ריק
         this.employee.startWork=updateEmployee.startWork ? new Date(updateEmployee.startWork) : new Date(), // נוודא שהערך של updateEmployee.startWork אם הוא מוגדר, ואם כן נשתמש בו כערך תאריך, אחרת נשתמש בתאריך נוכחי
        this.employee.birthDate= updateEmployee.birthDate ? new Date(updateEmployee.birthDate) : new Date(), // כאן נפעיל את האופרטור ?? ונשתמש בתאריך נוכחי אם הערך של updateEmployee.birthDate לא מוגדר
        this.employee.gender= this.parseGender(updateEmployee.gender),
        this.employee.active= updateEmployee.active || false
      };
      this._service.update(this.employee).subscribe({
        next: (res) => {
          console.log(res);
        }
      });
    }
  

  getEmployeeDetails(id:number){
    this._service.getEmployeeById(id).subscribe({
      next:(res:Employee)=>{
        console.log(res);
          this.employee=res;
          this.populateForm();
      }
    })
  }
  populateForm(): void {
    this.employeeForm.patchValue({
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      tz: this.employee.tz,
      startWork: this.employee.startWork,
      birthDate: this.employee.birthDate,
      gender: this.employee.gender,
      active: this.employee.active
    });
    this.setEmployeeRoles();
  }
  setEmployeeRoles(): void {
    const control = this.employeeForm.get('employeeRoles') as FormArray;
    control.clear();
    this.employee.employeeRoles.forEach(role => {
      control.push(this.createEmployeeRole(role));
    });
  }
  cancelEdit() {
    this.route.navigate(['employee/all-employees/']);
  }
  getRoles(){
    this._roleService.getRoles().subscribe({
      next:(res:Role[])=>{
          this.roles=res;
      }
    })
  }
  getNameRole(roleId:number){
    const selectedRole = this.roles.find(role => role.id === roleId);
    return selectedRole ? selectedRole.name : '';
  }
  getIdRole(name:string):number{
   return this.roles.find(r=>r.name==name)?.id || 0;
  }
 
parseGender(genderString: any): GenderEnum {
  if (genderString.toLowerCase() === 'male') {
    return GenderEnum.Male;
  } else if (genderString.toLowerCase() === 'female') {
    return GenderEnum.Female;
  } else {
    return GenderEnum.Other;
  }
}
updateOneRole(role:EmployeeRole){
  const i=this.employee.employeeRoles.findIndex(r=>r.id==role.id);
  this.employee.employeeRoles[i]=role;
}

}
