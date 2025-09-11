import { useParams } from "react-router-dom";

export const EmployeeDetail = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <>{id}</>
    );
};