import { Component, inject, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeRequest } from '../../../../core/interfaces/employee/IEmployee';
import { ReferenceValueService } from '../../../../core/services/reference-value.service';
import { DepartmentResponse } from '../../../../core/interfaces/reference/IReference';
import { CreateEmployeesModule } from '../../modules/create-employee.module';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CreateEmployeesModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
  providers: [DatePipe]
})

export class CreateEmployeeComponent {

  employeeForm: EmployeeRequest = this.initializeEmployeeForm();
  departments = signal<DepartmentResponse[]>([]);
  readonly maxDate = new Date();

  private employeeService = inject(EmployeeService);
  private referenceService = inject(ReferenceValueService);
  private dialogRef = inject(MatDialogRef<CreateEmployeeComponent>);
  private toastr = inject(ToastrService);
  private datePipe = inject(DatePipe);

  ngOnInit(){
    this.getDepartments();
  }

  saveNewEmployee(form: NgForm) {
    if(!form.valid){
      this.showValidationError();
      return;
    }
    this.formatDateAdded();
    this.createEmployee();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private getDepartments(): void {
    this.referenceService.getDepartments().subscribe({
      next: result => this.departments.set(result),
      error: () => this.toastr.error('Failed to load department values', 'Error')
    });
  }

  private initializeEmployeeForm(): EmployeeRequest {
    return {
      firstName: '',
      lastName: '',
      email: '',
      dateAdded: '',
      departmentId: -1,
    };
  }

  private showValidationError(): void {
    this.toastr.error('Please fill in the required fields', 'Validation Error');
  }

  private formatDateAdded(): void {
    if (this.employeeForm.dateAdded) {
      this.employeeForm.dateAdded = this.datePipe.transform(this.employeeForm.dateAdded, 'yyyy-MM-dd') ?? '';
    }
  }

  private createEmployee(): void {
    this.employeeService.createEmployee(this.employeeForm).subscribe({
      next: (result) => this.dialogRef.close(result),
      error: () => this.toastr.error('Failed to create new employee', 'Error'),
    });
  }
}
