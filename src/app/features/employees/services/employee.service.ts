import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { EmployeeResponse } from '../../../core/interfaces/employee/IEmployee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  private apiUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getEmployees(): Observable<EmployeeResponse[]>{
    return this.http.get<EmployeeResponse[]>(`${this.apiUrl}/employees/GetEmployees`).pipe(
      catchError(() => {
        return throwError(()=> new Error('Something went wrong; please try again later.'));
      })
    );
  }

}
