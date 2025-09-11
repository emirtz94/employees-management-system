import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react";
import { EmployeeForm } from "../EmployeeForm";
import { useParams } from "react-router-dom";

export const EmployeeDetail: FC = () => {
    const [employee, setEmployee] = useState({
        emp_no: 1001,
        first_name: "John",
        last_name: "Doe",
        gender: "M",
        birth_date: "1985-04-12",
        hire_date: "2010-06-01",
    });

    const { id } = useParams<{ id: string }>(); // <-- Get the ID from URL


    useEffect(() => {
        // TODO load data using SDK
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
