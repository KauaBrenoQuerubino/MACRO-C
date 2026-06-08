import { Component } from '@angular/core';
import { ForgotPasswordService } from '../../core/service/forgot-password/forgot-password.service';
import { EmailDTO, PasswordResetTokenDTO, ResetSenhaDTO } from '../../model/forgot-senha/forgot-senha';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-a-senha',
  imports: [FormsModule],
  templateUrl: './esqueci-a-senha.component.html',
  styleUrl: './esqueci-a-senha.component.scss'
})
export class EsqueciASenhaComponent {

  constructor(
    private forgotService: ForgotPasswordService,
    private router: Router
  ) {}

  etapaAtual = 1;

  emailDTO: EmailDTO = {
    email: ''
  } 

  resetTokenDTO: PasswordResetTokenDTO = {
    token: '',
    email: this.emailDTO.email
  }

  novaSenhaDTO: ResetSenhaDTO = {
    email: this.emailDTO.email,
    novaSenha: '',
    token: this.resetTokenDTO.token
  }
  
  enviarEmail() {

    if(this.emailDTO.email == '') {
      return;
    }

    this.forgotService.verificarEmail(this.emailDTO).subscribe({
      next: res => {
        console.log(res)
        this.etapaAtual = 2
      }
    })

  }

  validarCodigo() {

    if(this.resetTokenDTO.token == "") {
      return;
    }

    this.forgotService.validarCodigo(this.resetTokenDTO).subscribe({
      next: res=> {
        console.log(res)
        this.etapaAtual = 3
      }
    })
  }

  novaSenha() {
    
    if(this.novaSenhaDTO.novaSenha == "") {
      return;
    }

    this.forgotService.resetarSenha(this.novaSenhaDTO).subscribe({
      next: res=> {
        console.log(res)
        this.router.navigate(["/"])
      }
    })


  }



}
