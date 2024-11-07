import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoginModules } from '../../modules/login.module';
import { LoginRequest } from '../../../../core/interfaces/auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginModules],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginRequest: LoginRequest = {
    email: "",
    password: ""
  };

  private authService = inject(AuthService);
  private toastr = inject(ToastrService);

  login(form: NgForm): void {
    if(!form.valid){
      this.toastr.error("Please fill out all required fields.", 'Form Validation Error');
      return;
    }

    this.authService.login(this.loginRequest).subscribe(() => {
      this.toastr.success("Login Successful", "Success");
    })
  }
}
