import { IDepartmentModel } from "../model";

export interface IDepartmentsListQueryParams {
  pageSize: number;
  pageNumber: number;
  sort?: "ASC" | "DESC";
  orderBy?: "dept_no" | "dept_name";
}

export type IDepartmentCreatePayload = Pick<IDepartmentModel, "dept_name">;
export type IDepartmentUpdatePayload = Pick<IDepartmentModel, "dept_name">;
