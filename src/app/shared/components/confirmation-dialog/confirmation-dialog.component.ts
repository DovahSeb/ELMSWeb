import { Component, inject } from '@angular/core';
import { ConfirmationDialogModules } from '../../modules/confirmation-dialog.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ConfirmationDialogModules],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss'
})

export class ConfirmationDialogComponent {
  public _dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  public _data: ConfirmationDialogData = inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    this._dialogRef.close(true);
  }

  onCancel(): void {
    this._dialogRef.close(false);
  }
}

export interface ConfirmationDialogData {
  dialogTitle: string;
  message: string;
  confirmButtonLabel: string;
}
