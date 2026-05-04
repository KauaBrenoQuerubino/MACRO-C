import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';
import { LoginDTO } from '../../model/login/login-dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  user: LoginDTO = {
    email: '',
    senha: ''
  }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log(response)
      });

    }

}
