import { Component, Input } from '@angular/core';
import { EmployeeRole } from '../../Entities/EmployeeRole';
import { RoleService } from '../../role.service';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {
@Input() employeeRole!:EmployeeRole;
constructor(private _roleService:RoleService){}
getNameRole(id:number){
  var name=this._roleService.getNameRole(id);
  console.log(id);
  return name;
}
getManagerString(bool:boolean):string{
return bool==true?'ניהולי':'לא ניהולי';
}
}
