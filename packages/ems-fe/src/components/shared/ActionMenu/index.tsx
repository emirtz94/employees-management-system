import { FC, memo } from "react"
import { Link } from "react-router-dom"

export interface IActionMenuProperties {
    handleOnEdit: () => void
    handleOnDelete: () => void
}
export const ActionMenu: FC<IActionMenuProperties> = memo(({ handleOnEdit, handleOnDelete }) => {
    return (
        <ul className="dropdown-menu dropdown-menu-end">
            <li>
                <button className="dropdown-item" onClick={handleOnEdit}>
                    Edit
                </button>
            </li>
            <li>
                <button className="dropdown-item text-danger" onClick={handleOnDelete}>
                    Delete
                </button>
            </li>
        </ul>
    )

})