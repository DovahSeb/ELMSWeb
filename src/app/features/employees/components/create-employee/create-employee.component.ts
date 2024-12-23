import { Component, inject, Signal, effect, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEmployeeComponent {
  private referenceService = inject(ReferenceValueService);
  private dialogRef = inject(MatDialogRef<CreateEmployeeComponent>);
  private toastr = inject(ToastrService);
  private datePipe = inject(DatePipe);

  employeeForm = signal<EmployeeRequest>({
    firstName: '',
    lastName: '',
    email: '',
    dateAdded: '',
    departmentId: -1,
  });

  readonly maxDate = new Date();

  departments: Signal<DepartmentResponse[]>;
  isFormValid = computed(() => {
    const form = this.employeeForm();
    return (
      form.firstName.trim() !== '' &&
      form.lastName.trim() !== '' &&
      form.email.trim() !== '' &&
      form.departmentId > 0 &&
      form.dateAdded !== ''
    );
  });

  constructor() {
    this.departments = this.referenceService.departments;
    effect(() => {
      this.referenceService.getDepartments();
    });
  }

  saveNewEmployee() {
    if (!this.isFormValid()) {
      this.showValidationError();
      return;
    }

    this.employeeForm.update((form) => ({
      ...form,
      dateAdded: this.datePipe.transform(form.dateAdded, 'yyyy-MM-dd') ?? '',
    }));

    this.dialogRef.close(this.employeeForm());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private showValidationError(): void {
    this.toastr.error('Please fill in the required fields', 'Validation Error');
  }
}
