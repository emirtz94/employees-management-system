import { IManagerModel } from "../model";

export type IManagersListResponse = Pick<
  IManagerModel,
  "emp_no" | "first_name" | "last_name" | "dept_name"
>[];
