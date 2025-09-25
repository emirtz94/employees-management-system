import { IDepartmentCreatePayload, IDepartmentUpdatePayload } from "ems-sdk";
import { ChangeEvent, FC, FormEvent } from "react"

interface IDepartmentFormProperties {
    department: IDepartmentCreatePayload | IDepartmentUpdatePayload;
    handleFormSubmit: (e: FormEvent<Element>) => Promise<void>
    handleDepartmentChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DepartmentForm: FC<IDepartmentFormProperties> = ({ department, handleDepartmentChange, handleFormSubmit }) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="dept_name" className="form-label">
                        Department Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="dept_name"
                        value={department.dept_name}
                        onChange={handleDepartmentChange}
                    />
                </div>
            </div>

        </form>
    )
}