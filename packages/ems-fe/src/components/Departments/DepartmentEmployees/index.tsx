import { PageNavigation } from "../../shared/PageNavigation";
import { IEmployeeList } from "ems-sdk";
import { FC, memo, useEffect, useState } from "react"
import { fetchEmployees } from "../../../utils";
import { useNavigate } from "react-router-dom";

interface IDepartmentEmployeesProperties {
    dept_no: number;
};

type SortOrder = "ASC" | "DESC" | undefined;
type OrderBy = "emp_no" | "first_name" | "last_name" | "hire_date" | "gender" | "birth_date" | undefined;

export const DepartmentEmployees: FC<IDepartmentEmployeesProperties> = memo(({ dept_no }) => {
    const [employees, setEmployees] = useState<IEmployeeList[]>([]);
    const [pageSize, setPageSize] = useState(25);
    const [pageNumber, setPageNumber] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: OrderBy; order: SortOrder }>({
        key: "emp_no",
        order: "DESC",
    });
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees({ pageNumber, pageSize, dept_no }).then(({ data, meta }) => {
            setEmployees(data);
            setTotalPages(meta.totalPages);
            setTotal(meta.total);
        });
    }, [pageNumber, pageSize, sortConfig]);

    const handleSort = (key: Exclude<OrderBy, undefined>) => {
        setSortConfig((prev) => {
            if (prev.key !== key) {
                return { key, order: "ASC" }; // new column, always ASC
            }
            if (prev.order === "ASC") return { key, order: "DESC" };
            if (prev.order === "DESC") return { key: undefined, order: undefined }; // reset
            return { key, order: "ASC" };
        });
    };

    const handlePrevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    const handleNextPage = () => {
        console.log('handleNextPage: ', { pageNumber, totalPages })
        if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setPageNumber(1); // reset to first page when page size changes
    };

    const handleViewEmployee = (emp_no: number) => {
        navigate(`/employees/${emp_no}`)
    }

    return (
        <div>
            <div className="table-wrapper">
                <table className="table table-hover table-striped align-middle text-center">
                    <thead className="table-dark sticky-top">
                        <tr>
                            {[
                                { key: "first_name", label: "First Name" },
                                { key: "last_name", label: "Last Name" },
                                { key: "gender", label: "Gender" },
                                { key: "birth_date", label: "Birth Date" },
                                { key: "hire_date", label: "Hire Date" },
                            ].map(({ key, label }) => (
                                <th
                                    key={key}
                                    role="button"
                                    onClick={() => handleSort(key as Exclude<OrderBy, undefined>)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {label}{" "}
                                    {sortConfig.key === key && sortConfig.order === "ASC" && "▲"}
                                    {sortConfig.key === key && sortConfig.order === "DESC" && "▼"}
                                </th>
                            ))}
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
                                        <ul className="dropdown-menu dropdown-menu-end">
                                            <li>
                                                <button className="dropdown-item" onClick={() => handleViewEmployee(emp.emp_no)}>
                                                    View Employee
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PageNavigation
                pageNumber={pageNumber}
                pageSize={pageSize}
                total={total}
                totalPages={totalPages}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handlePageSizeChange={handlePageSizeChange} />

        </div>
    )
})