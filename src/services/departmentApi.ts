import API from "./axios";
import type { Department } from "./employeeApi";

export interface DepartmentPayload {
  name: string;
  location: string;
  manager: string;
}

export const departmentApi = {
  getAll: () =>
    API.get<Department[]>("/departments"),

  getById: (id: number) =>
    API.get<Department>(`/departments/${id}`),

  create: (data: DepartmentPayload) =>
    API.post<Department>("/departments", data),

  update: (id: number, data: DepartmentPayload) =>
    API.put<Department>(`/departments/${id}`, data),

  delete: (id: number) =>
    API.delete<void>(`/departments/${id}`),
};
