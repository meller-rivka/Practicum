import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { Employee } from '../../Entities/Employee';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import { EmployeeService } from '../../employee.service';
import { Role } from '../../Entities/Role';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { GenderTextPipe } from "../../gender-text.pipe";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-employee-table',
    standalone: true,
    templateUrl: './employee-table.component.html',
    styleUrl: './employee-table.component.css',
    imports: [DatePipe,MatTableModule,MatButtonModule, MatIconModule ,MatPaginator,MatPaginatorModule, GenderTextPipe,MatInputModule,MatFormFieldModule,MatSort,MatSortModule]
})
export class EmployeeTableComponent implements OnInit {

  employees:Employee[]=[];
  roles: Role[] = [];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void {
      this.loadEmployees();
  }
  displayedColumns: string[] = ['id','firstName', 'lastName', 'tz', 'startWork','birthDate','gender','edit','delete'];
 
  loadEmployees(){
    this._service.getEmployees().subscribe({
      next:(res:Employee[])=>{
        console.log(res);
        this.employees = res.filter(employee => employee.active); 
        this.dataSource = new MatTableDataSource(this.employees);
      }
    })
  }
  deleteEmployeeActive(employeeId:number){
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
          this._service.deleteEmployee(employeeId).subscribe({
            next:(res:any) => {
              console.log("success",res);
              this.loadEmployees();
            }
          })
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
  async downloadCSV(mess:string): Promise<void> {
    console.log("down");
    
    try {
      const success: boolean = await this._service.exportEmployeesToExcel();
      if (success) {
        // הורדת הקובץ בהצלחה
        console.log('הורדת הקובץ בהצלחה');
        this.save(mess);
      } else {
        // התרחשה שגיאה ביצירת הקובץ
        console.error('אירעה שגיאה ביצירת הקובץ');

      }
    } catch (error) {
      // טיפול בשגיאה אם נדרש
      console.error('אירעה שגיאה במהלך הורדת הקובץ:', error);
      this.failed();
    }
  }
  
  editEmployee(id:number){
    console.log("navigateToRecipeDetails");
    console.log(id);
     this.route.navigate(['/employee/edit-employee', id]);
   }
   save(severity: string) {
    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'הורדת הקובץ בהצלחה' });
}

failed() {
    // this.messageService.add({ severity: 'info', summary: 'Failed', detail: 'אירעה שגיאה ביצירת הקובץ' });
}
addEmployee(){
  console.log("add");
  
  this.route.navigate(['employee/add-employee']);

}

constructor(private _service:EmployeeService,private route: Router){
  //  this.loadEmployees();
  this.dataSource = new MatTableDataSource(this.employees);
}

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
}
