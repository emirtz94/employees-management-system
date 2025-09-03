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
