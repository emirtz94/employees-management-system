import { IDepartmentList, IDepartmentListResponse, IEmployeeCreatePayload, IEmployeeUpdatePayload } from "ems-sdk";
import { ChangeEvent, FC, FormEvent, memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emsSDK } from "../../../utils";

export interface IEmployeeFormProperties {
    employee: IEmployeeCreatePayload | IEmployeeUpdatePayload;
    handleEmployeeChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFormSubmit: (e: FormEvent) => void;
};

export const EmployeeForm: FC<IEmployeeFormProperties> = memo(({ employee, handleEmployeeChange, handleFormSubmit }) => {
    const [departments, setDepartments] = useState<IDepartmentList[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async (): Promise<IDepartmentListResponse> => {
            // TODO in case of more than 100 Departments this field will not contain all the data
            const response = await emsSDK.departments.getList({ pageNumber: 1, pageSize: 100, sort: "ASC", orderBy: "dept_name" })
            return response
        }

        fetchDepartments().then(response => setDepartments(response.data))
    }, []);

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="first_name" className="form-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={employee.first_name}
                        onChange={handleEmployeeChange}
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="last_name" className="form-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={employee.last_name}
                        onChange={handleEmployeeChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="gender" className="form-label">
                        Gender
                    </label>
                    <select
                        className="form-select"
                        id="gender"
                        value={employee.gender}
                        onChange={handleEmployeeChange}
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="birth_date" className="form-label">
                        Birth Date
                    </label>
                    <input
                        type="date"
                        className="form-control"
                        id="birth_date"
                        value={employee.birth_date}
                        onChange={handleEmployeeChange}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="hire_date" className="form-label">
                    Hire Date
                </label>
                <input
                    type="date"
                    className="form-control"
                    id="hire_date"
                    value={employee.hire_date}
                    onChange={handleEmployeeChange}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="dept_no" className="form-label">
                    Assign to Department
                </label>
                <select
                    className="form-select"
                    id="dept_no"
                    value={employee.dept_no ?? ""}
                    onChange={handleEmployeeChange}
                >
                    <option value="">None</option>
                    {departments.map((dept) => (
                        <option key={dept.dept_no} value={dept.dept_no}>
                            {dept.dept_name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/employees")}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
})