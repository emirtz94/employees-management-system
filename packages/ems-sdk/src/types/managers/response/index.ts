import { IManagerModel } from "../model";

export interface IManagersListResponse {
  meta: {
    pageNumber: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: Pick<
    IManagerModel,
    "emp_no" | "first_name" | "last_name" | "dept_name"
  >[];
}

export type IPromoteToManagerResponse = Pick<IManagerModel, 'emp_no' | 'dept_no' | 'from_date'>