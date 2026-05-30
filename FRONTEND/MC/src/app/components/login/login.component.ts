import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginDTO } from '../../model/login/login-dto';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/guard/auth/auth.service';
import { NotificationService } from '../../until/notification.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private notify: NotificationService) {}

  user: LoginDTO = {
    email: '',
    senha: ''
  }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        this.notify.success('Login realizado!');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        this.notify.error('Email ou senha incorretos!');
      });

    }

}
