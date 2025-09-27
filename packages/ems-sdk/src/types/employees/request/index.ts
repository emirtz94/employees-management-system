import { IEmployeesModel } from "../model";

export interface IEmployeeListQueryParams {
  pageNumber: number;
  pageSize: number;
  orderBy?:
    | "emp_no"
    | "first_name"
    | "last_name"
    | "hire_date"
    | "gender"
    | "birth_date";
  sort?: "ASC" | "DESC";
  dept_no?: number;
  search?: string;
}

export type IEmployeeCreatePayload = Required<
  Pick<
    IEmployeesModel,
    "birth_date" | "first_name" | "gender" | "hire_date" | "last_name"
  >
> &
  Partial<Pick<IEmployeesModel, "dept_no">>;

export type IEmployeeUpdatePayload = Required<
  Pick<
    IEmployeesModel,
    "birth_date" | "first_name" | "gender" | "hire_date" | "last_name"
  >
> &
  Partial<Pick<IEmployeesModel, "dept_no">>;
