import {
  DepartmentsService,
  IDepartmentsService,
} from "./services/departments";
import { EmployeesService, IEmployeesService } from "./services/employees";

export * from "./types";

export interface IEmployeeManagementSDK {
  employees: IEmployeesService;
  departments: IDepartmentsService;
}

export class EmployeeManagementSDK implements IEmployeeManagementSDK {
  public employees: IEmployeesService;
  public departments: IDepartmentsService;

  constructor(baseURL: string) {
    this.employees = new EmployeesService(baseURL);
    this.departments = new DepartmentsService(baseURL);
  }
}
