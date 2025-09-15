import { FC } from "react"
import './styles.css';

interface ICreateButtonProperties {
    label: string;
    handleOnCreateClick: () => void;
}

export const CreateButton: FC<ICreateButtonProperties> = ({ label, handleOnCreateClick }) => {
    return (
        <div className="position-fixed create-button-wrapper create-button-wrapper__position">
            <button
                className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center shadow create-button-wrapper__button"
                onClick={handleOnCreateClick}
                title={label}
            >
                +
            </button>
        </div>

    )
}