import { Component, inject, Signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeRequest } from './../../interfaces/IEmployee';
import { ReferenceValueService } from '../../../../core/services/reference-value.service';
import { DepartmentResponse } from '../../../../core/interfaces/reference/IReference';
import { CreateEmployeesModule } from '../../modules/create-employee.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [CreateEmployeesModule],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss',
  providers: [DatePipe]
})

export class CreateEmployeeComponent {

  private referenceService = inject(ReferenceValueService);
  private dialogRef = inject(MatDialogRef<CreateEmployeeComponent>);
  private toastr = inject(ToastrService);
  private datePipe = inject(DatePipe);

  employeeForm: EmployeeRequest = this.initializeEmployeeForm();
  departments: Signal<DepartmentResponse[]>;
  readonly maxDate = new Date();

  constructor(){
    this.departments = this.referenceService.departments;
    this.referenceService.getDepartments();
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
    this.dialogRef.close(this.employeeForm);
  }
}