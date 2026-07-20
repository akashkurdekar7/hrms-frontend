import API from "./axios";

export interface DashboardData {
  totalEmployees: number;
  totalDepartments: number;
  averageSalary: number;
  highestSalary: number;
}

export const dashboardApi = {
  get: () => API.get<DashboardData>("/dashboard"),
};
