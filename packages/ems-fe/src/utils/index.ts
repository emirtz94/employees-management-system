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
