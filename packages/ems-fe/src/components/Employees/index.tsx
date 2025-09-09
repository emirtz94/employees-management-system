import "./styles.css"; // We'll add custom CSS here

export const Employees = () => {
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
        // more employees...
    ];

    return (
        <div className="table-responsive shadow-sm rounded bg-white p-3">
            <h3 className="mb-3">Employees</h3>
            <table className="table table-hover table-striped align-middle text-center fancy-table">
                <thead className="table-dark">
                    <tr>
                        <th>Emp No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        <th>Birth Date</th>
                        <th>Hire Date</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesData.map((emp) => (
                        <tr key={emp.emp_no}>
                            <td className="fw-bold">{emp.emp_no}</td>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>
                                <span
                                    className={`badge ${
                                        emp.gender === "M" ? "bg-primary" : "bg-danger"
                                    }`}
                                >
                                    {emp.gender}
                                </span>
                            </td>
                            <td>{new Date(emp.birth_date).toLocaleDateString()}</td>
                            <td>{new Date(emp.hire_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
