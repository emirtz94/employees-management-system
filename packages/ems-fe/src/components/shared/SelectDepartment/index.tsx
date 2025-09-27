import { IDepartmentList } from "ems-sdk";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { fetchDepartments } from "../../../utils";

interface ISelectDepartmentProperties {
    dept_no: number | "";
    label: string;
    defaultSelectValueLabel: string;
    classNames: string[]; // col-md-6
    handleDepartmentChange: (e: ChangeEvent<HTMLSelectElement>) => void
};

export const SelectDepartment: FC<ISelectDepartmentProperties> = ({ label, defaultSelectValueLabel, dept_no, classNames,  handleDepartmentChange }) => {
    const [departments, setDepartments] = useState<IDepartmentList[]>([]);

    useEffect(() => {
        // TODO in case we have more than 100 departments then not all of them will be visible
        fetchDepartments({ pageNumber: 1, pageSize: 100 }).then(response => setDepartments(response))
    }, []);

    return (
        <div className={[...classNames, "mb-3"].join(" ")}>
            <label htmlFor="dept_no" className="form-label">
                {label}
            </label>
            <select
                className="form-select"
                id="dept_no"
                value={dept_no ?? ""}
                onChange={handleDepartmentChange}
            >
                <option value="">{defaultSelectValueLabel}</option>
                {departments.map((dept) => (
                    <option key={dept.dept_no} value={dept.dept_no}>
                        {dept.dept_name}
                    </option>
                ))}
            </select>
        </div>
    )
}