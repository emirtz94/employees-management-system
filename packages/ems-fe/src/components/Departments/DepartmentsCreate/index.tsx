import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { DepartmentForm } from "../DepartmentForm";
import { IDepartmentCreatePayload } from "ems-sdk";
import { useNavigate } from "react-router-dom";
import { emsSDK } from "../../../utils";

const defaultDepartmentPayload: IDepartmentCreatePayload = {
    dept_name: ""
}

export const DepartmentsCreate = () => {
    const [department, setDepartment] = useState<IDepartmentCreatePayload>(defaultDepartmentPayload);
    const navigate = useNavigate();

    const handleFormSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            try {
                await emsSDK.departments.create(department);

                navigate(`/departments`);
            } catch (error) {
                console.error("Error saving employee:", error);
            }
        },
        [department]
    );

    const handleDepartmentChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { id, value } = e.target;
            setDepartment((prev) => ({ ...prev, [id]: value }));
        },
        []
    );

    return (
        <div className="container py-4">
            <div className="shadow-sm rounded bg-white p-4">
                <h3 className="mb-4">Create Department</h3>
                <DepartmentForm
                    department={department}
                    handleDepartmentChange={handleDepartmentChange}
                    handleFormSubmit={handleFormSubmit} />
            </div>
        </div>
    );
}