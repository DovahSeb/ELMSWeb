import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeRequest, EmployeeResponse } from '../../../core/interfaces/employee/IEmployee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private readonly apiUrl = `${environment.baseUrl}/employees`;
  private http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getEmployees(): Observable<EmployeeResponse[]>{
    return this.http.get<EmployeeResponse[]>(`${this.apiUrl}/GetEmployees`);
  }

  getEmployeeById(id: string): Observable<EmployeeResponse>{
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/GetEmployeeById/${id}`);
  }

  createEmployee(newEmployee: EmployeeRequest): Observable<EmployeeResponse>{
    return this.http.post<EmployeeResponse>(`${this.apiUrl}/CreateEmployee`, newEmployee, this.httpOptions);
  }

  updateEmployee(id: string, employee: EmployeeRequest): Observable<EmployeeResponse>{
    return this.http.put<EmployeeResponse>(`${this.apiUrl}/UpdateEmployee/${id}`, employee, this.httpOptions);
  }

}
