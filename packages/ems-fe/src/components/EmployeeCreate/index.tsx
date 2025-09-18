import { IEmployeeCreatePayload } from "ems-sdk";
import { EmployeeForm } from "../EmployeeForm";
import { ChangeEvent, FC, FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { emsSDK } from "../../utils";

interface IEmployeeCreateProperties {

};

const defaultEmployeePayload = {
    first_name: "",
    last_name: "",
    gender: "",
    birth_date: "",
    hire_date: "",
} as unknown as IEmployeeCreatePayload;

export const EmployeeCreate: FC<IEmployeeCreateProperties> = ({ }) => {
    const [employee, setEmployee] = useState<IEmployeeCreatePayload>(defaultEmployeePayload);
    const navigate = useNavigate();

    const handleFormSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            try {
                await emsSDK.employees.create(employee);

                navigate(`/employees`);
            } catch (error) {
                console.error("Error saving employee:", error);
            }
        },
        [employee, navigate]
    );

    const handleEmployeeChange = useCallback(
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { id, value } = e.target;
            setEmployee((prev) => ({ ...prev, [id]: value }));
        },
        []
    );

    return (
        <div className="container py-4">
            <div className="shadow-sm rounded bg-white p-4">
                <h3 className="mb-4">Edit Employee</h3>
                <EmployeeForm employee={employee}
                    handleEmployeeChange={handleEmployeeChange}
                    handleFormSubmit={handleFormSubmit} />
            </div>
        </div>
    );
} 