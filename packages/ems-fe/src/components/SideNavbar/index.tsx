import { NavLink } from "react-router-dom";

export const SideNavbar = () => {
  return (
    <nav className="d-flex flex-column vh-100 p-3 bg-dark text-white" style={{ width: "220px" }}>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-white" : "text-white"}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/employees"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-white" : "text-white"}`
            }
          >
            Employees
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/departments"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-white" : "text-white"}`
            }
          >
            Departments
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};