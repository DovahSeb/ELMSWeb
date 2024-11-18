import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentResponse } from '../interfaces/reference/IReference';

@Injectable({
  providedIn: 'root'
})
export class ReferenceValueService {

  private readonly apiUrl = `${environment.baseUrl}/references`;
  private http = inject(HttpClient);

  getDepartments(): Observable<DepartmentResponse[]> {
    return this.http.get<DepartmentResponse[]>(`${this.apiUrl}/GetDepartments`);
  }
  
}
