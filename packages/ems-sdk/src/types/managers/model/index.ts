import { IDepartmentModel } from "../../departments/model";
import { IEmployeesModel } from "../../employees/model";

export type IManagerModel = Pick<
  IEmployeesModel,
  "emp_no" | "first_name" | "last_name"
> &
  Pick<IDepartmentModel, "dept_name" | "dept_no"> & {
    from_date: string;
    to_date: null | string;
  };
