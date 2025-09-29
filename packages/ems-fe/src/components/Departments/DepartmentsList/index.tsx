import { useEffect, useState } from "react";
import { ActionMenu } from "../../shared/ActionMenu";
import { CreateButton } from "../../shared/CreateButton";
import { PageNavigation } from "../../shared/PageNavigation";
import { IDepartmentList } from "ems-sdk";
import { useNavigate } from "react-router-dom";
import { emsSDK, fetchDepartments } from "../../../utils";
import "./styles.css";

type SortOrder = "ASC" | "DESC" | undefined;
type OrderBy = "dept_no" | "dept_name" | undefined;

export const DepartmentsList = () => {
    const [departments, setDepartments] = useState<IDepartmentList[]>([]);
    const [pageSize, setPageSize] = useState(25);
    const [pageNumber, setPageNumber] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: OrderBy; order: SortOrder }>({
        key: "dept_no",
        order: "DESC",
    });
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchDepartments({
            pageNumber,
            pageSize,
            orderBy: sortConfig.key,
            sort: sortConfig.order
        }).then(({ data, meta }) => {
            setDepartments(data);
            setTotalPages(meta.totalPages);
            setTotal(meta.total);
        });
    }, [pageNumber, pageSize, sortConfig]);

    const createDepartment = () => {
        navigate(`/departments/create`)
    }

    const editDepartment = (dept_no: number) => {
        navigate(`/departments/${dept_no}`)
    }

    const deleteDepartment = async (id: number) => {
        try {
            await emsSDK.departments.delete(id);

            fetchDepartments({ pageNumber, pageSize }).then(({ data, meta }) => {
                setDepartments(data);
                setTotalPages(meta.totalPages);
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

    return (
        <div className="position-relative">
            <div className="table-responsive shadow-sm rounded bg-white p-3">
                <h3 className="mb-3">Departments</h3>
                <div className="table-wrapper">
                    <table className="table table-hover table-striped align-middle text-center">
                        <thead className="table-dark sticky-top">
                            <tr>
                                {[
                                    { key: "dept_name", label: "Department Name" },
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
                            {departments.map((d) => (
                                <tr key={d.dept_no}>
                                    <td>{d.dept_name}</td>
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
                                                handleOnEdit={() => editDepartment(d.dept_no)}
                                                handleOnDelete={() => deleteDepartment(d.dept_no)} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PageNavigation pageNumber={pageNumber} pageSize={pageSize} total={total} totalPages={totalPages} handleNextPage={handleNextPage} handlePrevPage={handlePrevPage} handlePageSizeChange={handlePageSizeChange} />
            </div>
            <CreateButton label={"Create new employee"} handleOnCreateClick={createDepartment} />
        </div>
    )
}