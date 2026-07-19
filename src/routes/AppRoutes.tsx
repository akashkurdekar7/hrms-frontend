import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";

import DashboardPage from "../features/dashboard/DashboardPage";
import EmployeePage from "../features/employees/EmployeePage";
import DepartmentPage from "../features/departments/DepartmentPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/employees" element={<EmployeePage />} />

          <Route path="/departments" element={<DepartmentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
