export interface EmployeeRequest {
    firstName: string;
    lastName: string;
    email: string;
    dateAdded: string;
    departmentId: number;
}

export interface EmployeeResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
}