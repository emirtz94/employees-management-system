import { IEmployeesModel } from "../model";

export interface IEmployeeListQueryParams {
  pageNumber: number;
  pageSize: number;
  orderBy?: "emp_no" | "first_name" | "last_name" | "hire_date" | "gender" | "birth_date";
  sort?: "ASC" | "DESC";
}

export type IEmployeeCreatePayload = Pick<
  IEmployeesModel,
  "birth_date" | "first_name" | "gender" | "hire_date" | "last_name"
>;

export type IEmployeeUpdatePayload = Pick<
  IEmployeesModel,
  "birth_date" | "first_name" | "gender" | "hire_date" | "last_name"
>;
