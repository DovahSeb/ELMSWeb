export interface EmployeeRequest {
    firstName: string;
    lastName: string;
    email: string;
    dateJoined: string;
    departmentId: number;
}

export interface EmployeeResponse {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
}