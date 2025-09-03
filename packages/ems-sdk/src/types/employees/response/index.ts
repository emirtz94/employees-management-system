import { IEmployeesModel } from "../model";

export type IEmployeeListResponse = {
  meta: {
    pageNumber: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Pick<
    IEmployeesModel,
    | "emp_no"
    | "first_name"
    | "last_name"
    | "gender"
    | "birth_date"
    | "hire_date"
  >[];
};

export type IEmployeeGetByIdResponse = Pick<
  IEmployeesModel,
  "emp_no" | "first_name" | "last_name" | "gender" | "birth_date" | "hire_date"
>;

export type IEmployeeCreateResponse = Pick<
  IEmployeesModel,
  "emp_no" | "first_name" | "last_name" | "gender" | "birth_date" | "hire_date"
>;

export type IEmployeeUpdateResponse = Pick<
  IEmployeesModel,
  "emp_no" | "first_name" | "last_name" | "gender" | "birth_date" | "hire_date"
>;
