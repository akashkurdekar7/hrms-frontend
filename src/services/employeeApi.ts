import API from "./axios";

export interface Department {
  id: number;
  name: string;
  location: string;
  manager: string;
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  designation: string;
  salary: number;
}

export interface EmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  designation: string;
  salary: number;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const employeeApi = {
  getAll: () =>
    API.get<Employee[]>("/employees"),

  getPage: (page: number, size: number) =>
    API.get<PageResponse<Employee>>("/employees/page", {
      params: { page, size },
    }),

  getById: (id: number) =>
    API.get<Employee>(`/employees/${id}`),

  create: (data: EmployeeDto) =>
    API.post<Employee>("/employees", data),

  update: (id: number, data: EmployeeDto) =>
    API.put<Employee>(`/employees/${id}`, data),

  delete: (id: number) =>
    API.delete<string>(`/employees/${id}`),

  search: (keyword: string) =>
    API.get<Employee[]>("/employees/search", {
      params: { keyword },
    }),
};
