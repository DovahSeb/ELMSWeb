import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { EmployeeRequest, EmployeeResponse } from './../interfaces/IEmployee';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  private readonly apiUrl = `${environment.baseUrl}/employees`;

  private readonly _employees: WritableSignal<EmployeeResponse[]> = signal([]);
  readonly employees: Signal<EmployeeResponse[]> = this._employees.asReadonly();

  private readonly _selectedEmployee: WritableSignal<EmployeeResponse | null> = signal(null);
  readonly selectedEmployee: Signal<EmployeeResponse | null> = this._selectedEmployee.asReadonly();

  constructor(private http: HttpClient) {}

  getEmployees(): void {
    this.http
      .get<EmployeeResponse[]>(`${this.apiUrl}/GetEmployees`)
      .pipe(tap(employees => this._employees.set(employees)))
      .subscribe()
  };

  getEmployeeById(id: string): void {
    this.http
      .get<EmployeeResponse>(`${this.apiUrl}/GetEmployeeById/${id}`)
      .pipe(tap(employee => this._selectedEmployee.set(employee)))
      .subscribe()
  };

  createEmployee(newEmployee: EmployeeRequest): void {
    this.http
      .post<EmployeeResponse>(`${this.apiUrl}/CreateEmployee`, newEmployee)
      .pipe(tap(createdEmployee => this._employees.update(currentEmployees => [...currentEmployees, createdEmployee])))
      .subscribe()
  }

  updateEmployee(id: string, updatedEmployee: EmployeeRequest): void {
    this.http
      .put<EmployeeResponse>(`${this.apiUrl}/UpdateEmployee/${id}`, updatedEmployee)
      .pipe(tap(employee => this._employees.update(currentEmployees => currentEmployees.map(e => e.id === employee.id ? employee : e))))
      .subscribe()
  }
}
