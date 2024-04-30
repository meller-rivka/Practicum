import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, buffer } from 'rxjs';
import { Employee, GenderEnum } from './Entities/Employee';

import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
import { GenderTextPipe } from './gender-text.pipe';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
 

  private apiUrl = 'http://localhost:5013/api/Employee'; // Replace with your backend endpoint

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }
  createEmployee(employeeData: Employee) {
    console.log(employeeData);
    return this.http.post(this.apiUrl,employeeData);
  }
 
  deleteEmployee(employeeId: number) {
    return this.http.delete(`${this.apiUrl}/${employeeId}/active`);
  }
  
  exportEmployeesToExcel(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getEmployees().subscribe(async (employees) => {
        try {
          // Create Excel workbook and worksheet
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Employees');
  
          // Add column headers
          worksheet.columns = [
            { header: 'ת.ז.', key: 'TZ' },
            { header: 'שם פרטי', key: 'FirstName' },
            { header: 'שם משפחה', key: 'LastName' },
            { header: 'תאריך תחילת עבודה', key: 'StartWork' },
            { header: 'תאריך לידה', key: 'BirthDate' },
            { header: 'מין', key: 'Gender' },
          ];
  
          const employeeData = employees.map(employee => ({
            TZ: employee.tz,
            FirstName: employee.firstName,
            LastName:employee.lastName,
            StartWork: employee.startWork,
            BirthDate: employee.birthDate,
            Gender: (employee.gender as unknown as number)===0 ? 'Male' : 'Female',
          }));
          
          worksheet.addRows(employeeData);
          
          // Generate Excel file buffer
          const buffer = await workbook.xlsx.writeBuffer();
  
          // Download the file
          saveAs(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'employees.xlsx');
  
          // Alert success
          resolve(true);
        } catch (error) {
          console.error('Error generating Excel file:', error);
          reject(false);
        }
      });
    });
  }
  

   getEmployeeById(id:number){
    return this.http.get<Employee>(`${this.apiUrl}/${id}`)
   }
    update(emp:Employee): Observable<Employee>{
      console.log(emp);
      
      return this.http.put<Employee>(`${this.apiUrl}/${emp.id}`, emp);
    }
}
