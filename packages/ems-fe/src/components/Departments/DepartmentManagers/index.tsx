import { FC, memo, useEffect, useState } from "react";
import { emsSDK } from "../../../utils";
import { IManagersList } from "ems-sdk";
import { PageNavigation } from "../../shared/PageNavigation";
import { useNavigate } from "react-router-dom";

interface IDepartmentManagersProperties {
    dept_no: number;
}

type SortOrder = "ASC" | "DESC" | undefined;
type OrderBy = "emp_no" | "first_name" | "last_name" | "from_date" | "to_date" | undefined;

export const DepartmentManagers: FC<IDepartmentManagersProperties> = memo(({ dept_no }) => {
    const [managers, setManagers] = useState<IManagersList>([]);
    const [pageSize, setPageSize] = useState(25);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [total, setTotal] = useState(0);
    const [sortConfig, setSortConfig] = useState<{ key: OrderBy; order: SortOrder }>({
        key: "emp_no",
        order: "DESC",
    });

    const navigate = useNavigate();

    const fetchManagers = async ({
        pageNumber,
        pageSize,
        dept_no
    }: {
        pageNumber: number;
        pageSize: number;
        dept_no: number
    }) => {
        return emsSDK.managers.getList({ pageNumber, pageSize, dept_no });
    }

    useEffect(() => {
        fetchManagers({ pageNumber, pageSize, dept_no }).then(({ data, meta }) => {
            setManagers(data);
            setTotalPages(meta.totalPages);
            setTotal(meta.total);
        });
    }, [pageNumber, pageSize]);

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

    const handleViewManager = (emp_no: number) => {
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
                                { key: "from_date", label: "From Date" },
                                { key: "to_date", label: "To Date" },
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
                        {managers.map((manager) => (
                            <tr key={manager.emp_no}>
                                <td>{manager.first_name}</td>
                                <td>{manager.last_name}</td>
                                <td>{new Date(manager.from_date).toLocaleDateString()}</td>
                                <td>{manager.to_date ? new Date(manager.to_date).toLocaleDateString() : null}</td>
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
                                                <button className="dropdown-item" onClick={() => handleViewManager(manager.emp_no)}>
                                                    View Manager
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