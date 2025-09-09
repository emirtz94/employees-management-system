import "bootstrap/dist/css/bootstrap.min.css";
import './styles.css';

import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { App } from "./components/App";
import { Employees } from "./components/Employees";
import { Departments } from "./components/Departments";
import { Dashboard } from "./components/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, Component: Dashboard }, // default route for /
            { path: "employees", Component: Employees },
            { path: "departments", Component: Departments },
        ],
    },
]);


const root = createRoot(document.querySelector('[data-employee-management-system]') as HTMLElement);

root.render(<RouterProvider router={router} />);