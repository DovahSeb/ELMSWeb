import { Component, inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { LandingComponent } from './features/home/components/landing/landing.component';
import { MenuComponent } from './features/home/components/menu/menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LandingComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ELMSWeb';

  public authService = inject(AuthService);

  ngOnInit(){
    this.authService.loadAuthState();
  }
}
