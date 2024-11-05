import { Component } from '@angular/core';
import { LoginModules } from '../../modules/login.module';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoginModules],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
