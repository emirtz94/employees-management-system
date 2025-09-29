import { ChangeEvent, useEffect, useState } from "react";
import { ActionMenu } from "../../shared/ActionMenu";
import { useNavigate } from "react-router-dom";
import { emsSDK } from "../../../utils";
import { IEmployeeList } from "ems-sdk";
import { CreateButton } from "../../shared/CreateButton";
import { PageNavigation } from "../../shared/PageNavigation";
import { SelectDepartment } from "../../shared/SelectDepartment";
import "./styles.css";

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
    const [departmentFilter, setDepartmentFilter] = useState<number>();
    const [employeeSearch, setEmployeeSearch] = useState<string>("");
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    const fetchEmployees = async ({ pageNumber, pageSize, orderBy, sort, dept_no, search }: {
        pageNumber: number;
        pageSize: number;
        orderBy?: "emp_no" | "first_name" | "last_name" | "hire_date" | "gender" | "birth_date";
        sort?: "ASC" | "DESC";
        dept_no?: number;
        search?: string;
    }) => {
        return await emsSDK.employees.getList({ pageNumber, pageSize, orderBy, sort, dept_no, search });
    }

    useEffect(() => {
        fetchEmployees({
            pageNumber,
            pageSize,
            orderBy: sortConfig.key,
            sort: sortConfig.order,
            dept_no: departmentFilter,
            search: employeeSearch.length >= 3 ? employeeSearch : undefined
        }).then(({ data, meta }) => {
            setEmployees(data);
            setTotalPages(meta.totalPages);
            setTotal(meta.total);
        });
    }, [pageNumber, pageSize, sortConfig, departmentFilter, employeeSearch]);

    const createEmployee = () => {
        navigate(`/employees/create`)
    }

    const editEmployee = (emp_no: number) => {
        navigate(`/employees/${emp_no}`)
    }

    const deleteEmployee = async (id: number) => {
        try {
            await emsSDK.employees.delete(id);

            fetchEmployees({ pageNumber, pageSize }).then(({ data, meta }) => {
                setEmployees(data);
                setTotalPages(meta.total);
                setTotal(meta.total);
            });
        } catch (error) {
            console.log('Failed to delete employee', { error });
        }
    }

    const handlePrevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    const handleNextPage = () => {
        if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
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

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const dept_no = parseInt(e.target.value);
        setDepartmentFilter(dept_no);
    }

    return (
        <div className="position-relative">
            <div className="table-responsive shadow-sm rounded bg-white p-3">
                <h3 className="mb-3">Employees</h3>

                <div className="row">
                    <div className="col-md-3 mb-3">
                        <label htmlFor="employeeSearch" className="form-label">
                            Search Employee
                        </label>
                        <input
                            type="text"
                            id="employeeSearch"
                            className="form-control"
                            placeholder="Search by first or last name"
                            value={employeeSearch}
                            onChange={(e) => setEmployeeSearch(e.target.value)}
                        />
                    </div>
                    <SelectDepartment
                        label={"Filter by Department"}
                        dept_no={departmentFilter ?? ""}
                        defaultSelectValueLabel={"All"}
                        classNames={["col-md-2"]}
                        handleDepartmentChange={handleDepartmentChange} />
                </div>
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
                                            <ActionMenu
                                                handleOnEdit={() => editEmployee(emp.emp_no)}
                                                handleOnDelete={() => deleteEmployee(emp.emp_no)} />
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
            <CreateButton label={"Create new employee"} handleOnCreateClick={createEmployee} />
        </div>
    );
};
