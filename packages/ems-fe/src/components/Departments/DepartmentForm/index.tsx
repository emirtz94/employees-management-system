import { IDepartmentCreatePayload, IDepartmentUpdatePayload } from "ems-sdk";
import { ChangeEvent, FC, FormEvent } from "react"
import { useNavigate } from "react-router-dom";

interface IDepartmentFormProperties {
    department: IDepartmentCreatePayload | IDepartmentUpdatePayload;
    handleFormSubmit: (e: FormEvent<Element>) => Promise<void>
    handleDepartmentChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const DepartmentForm: FC<IDepartmentFormProperties> = ({ department, handleDepartmentChange, handleFormSubmit }) => {
    const navigate = useNavigate();

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
            <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                    Save
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/departments")}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}