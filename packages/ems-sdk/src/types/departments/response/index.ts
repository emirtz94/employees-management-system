import { IDepartmentModel } from "../model";

export type IDepartmentList = Pick<IDepartmentModel, "dept_name" | "dept_no">;

export type IDepartmentListResponse = {
  meta: {
    pageNumber: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  data: IDepartmentList[];
};

export type IDepartmentGetByIdResponse = Pick<
  IDepartmentModel,
  "dept_name" | "dept_no"
>;

export type IDepartmentCreateResponse = Pick<
  IDepartmentModel,
  "dept_name" | "dept_no"
>;

export type IDepartmentUpdateResponse = Pick<
  IDepartmentModel,
  "dept_name" | "dept_no"
>;
