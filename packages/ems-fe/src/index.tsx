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
import { DepartmentsCreate } from "./components/Departments/DepartmentsCreate";
import { DepartmentsDetail } from "./components/Departments/DepartmentsDetail";
import { ManagersList } from "./components/Managers/ManagersList";

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
            { path: "departments/create", Component: DepartmentsCreate },
            { path: "departments/:id", Component: DepartmentsDetail },
            { path: "managers", Component: ManagersList },

        ],
    },
]);


const root = createRoot(document.querySelector('[data-employee-management-system]') as HTMLElement);

root.render(<RouterProvider router={router} />);