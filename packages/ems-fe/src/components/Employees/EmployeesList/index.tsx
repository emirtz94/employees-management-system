import { useEffect, useState } from "react";
import { ActionMenu } from "../../shared/ActionMenu";
import { useNavigate } from "react-router-dom";
import { emsSDK } from "../../../utils";
import { IEmployeeListResponse, IEmployeeList } from "ems-sdk";
import { CreateButton } from "../../shared/CreateButton";
import { PageNavigation } from "../../shared/PageNavigation";

type SortOrder = "ASC" | "DESC" | undefined;
type OrderBy = "emp_no" | "first_name" | "last_name" | "hire_date" | "gender" | "birth_date" | undefined;

export const EmployeesList = () => {
    const [employees, setEmployees] = useState<IEmployeeList[]>([]);
    const [pageSize, setPageSize] = useState(25);
    const [pageNumber, setPageNumber] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: OrderBy; order: SortOrder }>({
        key: "emp_no",
        order: "DESC",
    });

    const navigate = useNavigate();

    const fetchEmployees = async ({ pageNumber, pageSize, orderBy, sort }: {
        pageNumber: number,
        pageSize: number,
        orderBy?: "emp_no" | "first_name" | "last_name" | "hire_date" | "gender" | "birth_date",
        sort?: "ASC" | "DESC"
    }) => {
        const response: IEmployeeListResponse = await emsSDK.employees.getList({ pageNumber, pageSize, orderBy, sort })

        return response.data;
    }

    useEffect(() => {
        fetchEmployees({ pageNumber, pageSize, orderBy: sortConfig.key, sort: sortConfig.order }).then(emp => setEmployees(emp));
    }, [pageNumber, pageSize, sortConfig]);

    const createEmployee = () => {
        navigate(`/employees/create`)
    }

    const editEmployee = (emp_no: number) => {
        navigate(`/employees/${emp_no}`)
    }

    const deleteEmployee = async (id: number) => {
        try {
            await emsSDK.employees.delete(id);

            fetchEmployees({ pageNumber, pageSize }).then(emp => setEmployees(emp));
        } catch (error) {
            console.log('Failed to delete employee', { error });
        }
    }

    const handlePrevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    const handleNextPage = () => {
        // just a placeholder, should be totalPages from API
        setPageNumber(pageNumber + 1);
    };

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setPageNumber(1); // reset to first page when page size changes
    };

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

    return (
        <div className="position-relative">
            <div className="table-responsive shadow-sm rounded bg-white p-3">
                <h3 className="mb-3">Employees</h3>
                <table className="table table-hover table-striped align-middle text-center">
                    <thead className="table-dark">
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
                                        <ActionMenu
                                            handleOnEdit={() => editEmployee(emp.emp_no)}
                                            handleOnDelete={() => deleteEmployee(emp.emp_no)} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PageNavigation pageNumber={pageNumber} pageSize={pageSize} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handlePageSizeChange={handlePageSizeChange} />
            </div>
            <CreateButton label={"Create new employee"} handleOnCreateClick={createEmployee} />
        </div>
    );
};
