import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../../../core/interfaces/employee/IEmployee';
import { ListEmployeesModules } from '../../modules/list-employees.module';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [ListEmployeesModules],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})

export class ListEmployeesComponent {

  employees = signal<EmployeeResponse[]>([]);

  private employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(result => {
      this.employees.set(result);
    })
  }
}
