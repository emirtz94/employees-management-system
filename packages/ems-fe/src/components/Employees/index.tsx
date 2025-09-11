import { ActionMenu } from "../shared/ActionMenu";
import { useNavigate } from "react-router-dom";

export const Employees = () => {
    const navigate = useNavigate();

    const employeesData = [
        {
            emp_no: 1001,
            first_name: "John",
            last_name: "Doe",
            gender: "M",
            birth_date: "1985-04-12",
            hire_date: "2010-06-01",
        },
        {
            emp_no: 1002,
            first_name: "Jane",
            last_name: "Smith",
            gender: "F",
            birth_date: "1990-08-22",
            hire_date: "2015-03-15",
        },
    ];

    const handleOnEditBtnClick = (emp_no: number) => {
        navigate(`/employees/${emp_no}`)
    }

    const handleOnDeleteBtnClick = () => {
        
    }

    return (
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
                    {employeesData.map((emp) => (
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
                                        handleOnEdit={() => handleOnEditBtnClick(emp.emp_no)} 
                                        handleOnDelete={handleOnDeleteBtnClick} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
