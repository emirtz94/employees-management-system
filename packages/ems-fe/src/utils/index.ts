import { EmployeeManagementSDK, IDepartmentListResponse } from "ems-sdk";

export const emsSDK = new EmployeeManagementSDK(process.env.BASE_URL as string);

// fetch list of departments
export const fetchDepartments = async ({
  pageNumber,
  pageSize,
  orderBy,
  sort,
}: {
  pageNumber: number;
  pageSize: number;
  orderBy?: "dept_no" | "dept_name";
  sort?: "ASC" | "DESC";
}): Promise<IDepartmentListResponse> => {
  return await emsSDK.departments.getList({
    pageNumber,
    pageSize,
    orderBy,
    sort,
  });
};

export const fetchEmployees = async ({
  pageNumber,
  pageSize,
  orderBy,
  sort,
  dept_no,
  search,
}: {
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
}) => {
  return await emsSDK.employees.getList({
    pageNumber,
    pageSize,
    orderBy,
    sort,
    dept_no,
    search,
  });
};
