import { Component, inject, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeResponse } from '../../../../core/interfaces/employee/IEmployee';
import { ListEmployeesModules } from '../../modules/list-employees.module';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
  private dialog = inject(MatDialog);
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (result) => this.employees.set(result),
      error: () => this.toastr.error('Failed to load employees', 'Error')
    });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(CreateEmployeeComponent, {
      height: 'auto',
      width: '600px',
    })

    dialogRef.afterClosed().subscribe({
      next: (result: EmployeeResponse) => {
        if(result){
          this.employees.update(currentEmployees => [...currentEmployees, result]);
          this.toastr.success(`Employee: ${result.firstName} ${result.lastName} successfully added`, 'Success');
        }
      }
    });
  }

}
