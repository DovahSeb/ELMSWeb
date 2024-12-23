import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SidenavComponent } from '../../../../core/layout/components/sidenav/sidenav.component';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SidenavComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  private authService = inject(AuthService);
  private dialog = inject(MatDialog)
  private toastr = inject(ToastrService)

  logout(): void {
    const dialogData: ConfirmationDialogData = {
      dialogTitle: 'Logout Confirmation',
      message: 'Are you sure you want to logout?',
      confirmButtonLabel: 'Yes, Logout',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.authService.logout();
        this.toastr.success("Logout Successful", "Success");
      }
    })
  }
}
