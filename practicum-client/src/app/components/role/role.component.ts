import { Component, Input, OnInit } from '@angular/core';
import { EmployeeRole } from '../../Entities/EmployeeRole';
import { RoleService } from '../../role.service';
import { Role } from '../../Entities/Role';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [DatePipe,MatCardModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent implements OnInit {
@Input() 
employeeRole!:EmployeeRole;
roles:Role[]=[];
constructor(private _roleService:RoleService){}
ngOnInit(): void {
    this.loadRoles();
}
loadRoles(){
  this._roleService.getRoles().subscribe({
    next:(res:Role[])=>{
      this.roles=res;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
getNameRole(){
  const existRole=this.roles.find((r)=>r.id===this.employeeRole.roleId);
  return existRole?existRole.name:'the role not found!'
}
getManagerString(bool:boolean):string{
return bool==true?'manager':'not manager!';
}
}
