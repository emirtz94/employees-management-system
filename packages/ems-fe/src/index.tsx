import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles.css';

import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "./components/App";
import { EmployeesList } from "./components/Employees/EmployeesList";
import { EmployeeDetail } from "./components/Employees/EmployeeDetail";
import { EmployeeCreate } from "./components/Employees/EmployeeCreate";
import { DepartmentsList } from "./components/Departments/DepartmentsList";
import { Dashboard } from "./components/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, Component: Dashboard }, // default route for /
            { path: "employees", Component: EmployeesList },
            { path: "employees/create", Component: EmployeeCreate },
            { path: "employees/:id", Component: EmployeeDetail },
            { path: "departments", Component: DepartmentsList },
        ],
    },
]);


const root = createRoot(document.querySelector('[data-employee-management-system]') as HTMLElement);

root.render(<RouterProvider router={router} />);