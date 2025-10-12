import { IManagerModel } from "../model";

export type IManagersList = Pick<
  IManagerModel,
  | "emp_no"
  | "first_name"
  | "last_name"
  | "dept_name"
  | "dept_no"
  | "from_date"
  | "to_date"
>[];
export interface IManagersListResponse {
  meta: {
    pageNumber: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: IManagersList;
}

export type IPromoteToManagerResponse = Pick<
  IManagerModel,
  "emp_no" | "dept_no" | "from_date"
>;
