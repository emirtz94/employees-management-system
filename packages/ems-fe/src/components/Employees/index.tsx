import { useEffect, useState } from "react";
import { ActionMenu } from "../shared/ActionMenu";
import { useNavigate } from "react-router-dom";
import { emsSDK } from "../../utils";
import { IEmployeeListResponse, IEmployeeList } from "ems-sdk";
import { CreateButton } from "../CreateButton";


export const Employees = () => {
    const [employees, setEmployees] = useState<IEmployeeList[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            const response: IEmployeeListResponse = await emsSDK.employees.getList({ pageNumber: 1, pageSize: 100 })

            return response.data;
        }

        fetchEmployees().then(emp => setEmployees(emp));
    }, [])

    const createEmployee = () => {
        navigate(`/employees/create`)
    }

    const editEmployee = (emp_no: number) => {
        navigate(`/employees/${emp_no}`)
    }

    const deleteEmployee = () => {

    }

    return (
        <div className="position-relative">
            <div className="table-responsive shadow-sm rounded bg-white p-3">
                <h3 className="mb-3">Employees</h3>
                <table className="table table-hover table-striped align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Birth Date</th>
                            <th>Hire Date</th>
                            <th></th> {/* Action column */}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.emp_no}>
                                <td>{emp.first_name}</td>
                                <td>{emp.last_name}</td>
                                <td>
                                    <span
                                        className={`badge ${emp.gender === "M" ? "bg-primary" : "bg-danger"
                                            }`}
                                    >
                                        {emp.gender}
                                    </span>
                                </td>
                                <td>{new Date(emp.birth_date).toLocaleDateString()}</td>
                                <td>{new Date(emp.hire_date).toLocaleDateString()}</td>
                                <td>
                                    {/* Three dots dropdown menu */}
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-sm btn-light"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            ⋮
                                        </button>
                                        <ActionMenu
                                            handleOnEdit={() => editEmployee(emp.emp_no)}
                                            handleOnDelete={deleteEmployee} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CreateButton label={"Create new employee"} handleOnCreateClick={createEmployee} />
        </div>
    );
};
