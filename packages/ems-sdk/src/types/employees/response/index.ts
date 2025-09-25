import { IEmployeesModel } from "../model";

export type IEmployeeList = Pick<
  IEmployeesModel,
  "emp_no" | "first_name" | "last_name" | "gender" | "birth_date" | "hire_date"
>;

export type IEmployeeListResponse = {
  meta: {
    pageNumber: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: IEmployeeList[];
};

export type IEmployeeGetByIdResponse = Pick<
  IEmployeesModel,
  "emp_no" | "first_name" | "last_name" | "gender" | "birth_date" | "hire_date"
>;

export type IEmployeeCreateResponse = Required<
  Pick<
    IEmployeesModel,
    | "emp_no"
    | "first_name"
    | "last_name"
    | "gender"
    | "birth_date"
    | "hire_date"
  >
> &
  Partial<Pick<IEmployeesModel, "dept_no">>;

export type IEmployeeUpdateResponse = Pick<
  IEmployeesModel,
  "emp_no" | "first_name" | "last_name" | "gender" | "birth_date" | "hire_date"
>;
