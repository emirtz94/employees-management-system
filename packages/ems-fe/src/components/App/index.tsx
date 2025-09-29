import { SideNavbar } from "../SideNavbar";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="d-flex min-vh-100">
      <SideNavbar />
      <main style={{ padding: "20px", flex: 1 }}>
        <Outlet /> {/* renders Dashboard, Employees, or Departments */}
      </main>
    </div>
  );
};
