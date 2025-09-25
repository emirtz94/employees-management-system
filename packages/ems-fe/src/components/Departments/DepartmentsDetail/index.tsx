import { IDepartmentGetByIdResponse } from "ems-sdk";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { emsSDK } from "../../../utils";
import { DepartmentForm } from "../DepartmentForm";

const defaultDepartmentPayload: IDepartmentGetByIdResponse = {
    dept_no: 0,
    dept_name: ""
}

export const DepartmentsDetail = () => {
    const [department, setDepartment] = useState<IDepartmentGetByIdResponse>(defaultDepartmentPayload);
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchDepartment = async (): Promise<IDepartmentGetByIdResponse> => {
            const response = await emsSDK.departments.getById(parseInt(id as string))
            return response
        }

        fetchDepartment().then(response => setDepartment(response))
    }, [id]);

    const handleFormSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            const { dept_no, ...payload } = department;
            try {
                await emsSDK.departments.update(dept_no, payload);

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
                <h3 className="mb-4">Edit Department</h3>
                <DepartmentForm 
                    department={department} 
                    handleDepartmentChange={handleDepartmentChange}
                    handleFormSubmit={handleFormSubmit} />
            </div>
        </div>
    );

}