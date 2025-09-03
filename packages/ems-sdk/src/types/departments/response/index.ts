import { IDepartmentModel } from "../model";

export type IDepartmentListResponse = Pick<
  IDepartmentModel,
  "dept_name" | "dept_no"
>[];

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
