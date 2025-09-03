import {
  DepartmentsService,
  IDepartmentsService,
} from "./services/departments";
import { EmployeesService, IEmployeesService } from "./services/employees";
import { IManagersService, ManagersService } from "./services/managers";

export * from "./types";

export interface IEmployeeManagementSDK {
  employees: IEmployeesService;
  departments: IDepartmentsService;
  managers: IManagersService;
}

export class EmployeeManagementSDK implements IEmployeeManagementSDK {
  public employees: IEmployeesService;
  public departments: IDepartmentsService;
  public managers: IManagersService;

  constructor(baseURL: string) {
    this.employees = new EmployeesService(baseURL);
    this.departments = new DepartmentsService(baseURL);
    this.managers = new ManagersService(baseURL);
  }
}
