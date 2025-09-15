import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './styles.css';

import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "./components/App";
import { Employees } from "./components/Employees";
import { Departments } from "./components/Departments";
import { Dashboard } from "./components/Dashboard";
import { EmployeeDetail } from "./components/EmployeeDetail";
import { EmployeeCreate } from "./components/EmployeeCreate";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, Component: Dashboard }, // default route for /
            { path: "employees", Component: Employees },
            { path: "employees/create", Component: EmployeeCreate },
            { path: "employees/:id", Component: EmployeeDetail },
            { path: "departments", Component: Departments },
        ],
    },
]);


const root = createRoot(document.querySelector('[data-employee-management-system]') as HTMLElement);

root.render(<RouterProvider router={router} />);