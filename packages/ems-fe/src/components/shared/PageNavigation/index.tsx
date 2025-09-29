import { FC } from "react"

interface IPageNavigation {
    pageSize: number;
    pageNumber: number;
    total: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
    handlePageSizeChange: (size: number) => void;
}

export const PageNavigation: FC<IPageNavigation> = ({ pageNumber, pageSize, total, totalPages, handleNextPage, handlePrevPage, handlePageSizeChange }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mt-3 w-100">
            {/* Page size dropdown */}
            <div>
                <label className="me-2">Rows per page:</label>
                <select
                    className="form-select d-inline-block w-auto"
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                >
                    {[25, 50, 100].map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

            {/* Page navigation */}
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={handlePrevPage}
                    disabled={pageNumber === 1}
                >
                    Previous
                </button>
                <span>Page {pageNumber} / {totalPages} (Total: {total})</span>
                <button
                    className="btn btn-outline-secondary btn-sm ms-2"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    )
}