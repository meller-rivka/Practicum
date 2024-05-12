import { EmployeeRole } from "./EmployeeRole";
export class Employee {
    id!: number;
    firstName!: string;
    lastName!: string;
    tz!: string;
    startWork!: Date;
    birthDate!: Date;
    gender!: number;
    employeeRoles!: EmployeeRole[];
    active!: boolean;
  }
  