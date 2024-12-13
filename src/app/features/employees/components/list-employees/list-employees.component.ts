import { Component, inject, Signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeRequest, EmployeeResponse } from './../../interfaces/IEmployee';
import { ListEmployeesModules } from '../../modules/list-employees.module';
import { ViewEmployeeComponent } from '../view-employee/view-employee.component';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [ListEmployeesModules],
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})

export class ListEmployeesComponent {
  private employeeService = inject(EmployeeService);
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  employees: Signal<EmployeeResponse[]>;

  constructor(){
    this.employees = this.employeeService.employees;
    this.employeeService.getEmployees();
  }

  viewDriver(id: string): void {
    this.dialog.open(ViewEmployeeComponent, {
      height: 'auto',
      width: '600px',
      data: {
        'id': id
      }
    });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: 'auto',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result: EmployeeRequest | null) => {
      if (result) {
        this.handleEmployeeCreation(result);
      }
    });
  }

  private handleEmployeeCreation(newEmployee: EmployeeRequest): void {
    this.employeeService.createEmployee(newEmployee);
    this.toastr.success(
      `Employee: ${newEmployee.firstName} ${newEmployee.lastName} successfully added`,
      'Success'
    );
  }
}
