import { EmployeeRole } from "./EmployeeRole";
export enum GenderEnum {
    Male = 'Male',
    Female = 'Female',
    Other='Other'
    // ... other options if needed
  }
export class Employee {
    id!: number;
    firstName!: string;
    lastName!: string;
    tz!: string;
    startWork!: Date;
    birthDate!: Date;
    gender!: GenderEnum; // Assuming GenderEnum is also defined in your Angular project
    employeeRoles!: EmployeeRole[];
    active!: boolean;
  }
  