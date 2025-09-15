import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react";
import { EmployeeForm } from "../EmployeeForm";
import { useParams } from "react-router-dom";
import { emsSDK } from "../../utils";
import { IEmployeeGetByIdResponse } from "ems-sdk";

const defaultEmployeePayload = {
    emp_no: 0,
    first_name: "",
    last_name: "",
    gender: "",
    birth_date: "",
    hire_date: "",
} as unknown as IEmployeeGetByIdResponse;

export const EmployeeDetail: FC = () => {
    const [employee, setEmployee] = useState<IEmployeeGetByIdResponse>(defaultEmployeePayload);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchEmployee = async (): Promise<IEmployeeGetByIdResponse> => {
            const response = await emsSDK.employees.getById(parseInt(id as string))
            return response
        }

        fetchEmployee().then(response => setEmployee(response))
    }, [id])

    const handleFormSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            console.log("Saving employee:", employee, { e });
            // TODO: call API for saving employee
        },
        [employee]
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
                <EmployeeForm employee={employee} handleEmployeeChange={handleEmployeeChange} handleFormSubmit={handleFormSubmit} />
            </div>
        </div>
    );
};
