import { Component } from '@angular/core';
import { ForgotPasswordService } from '../../core/service/forgot-password/forgot-password.service';
import { EmailDTO, PasswordResetTokenDTO, ResetSenhaDTO } from '../../model/forgot-senha/forgot-senha';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../until/notification.service';
import { LodingComponent } from "../../until/loding/loding.component";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-esqueci-a-senha',
  imports: [FormsModule, LodingComponent],
  templateUrl: './esqueci-a-senha.component.html',
  styleUrl: './esqueci-a-senha.component.scss'
})
export class EsqueciASenhaComponent {

  constructor(
    private forgotService: ForgotPasswordService,
    private router: Router,
    private notify: NotificationService
  ) {}

  etapaAtual = 1;

  isLoading = false

  confirmarSenha = ''

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
    
    this.isLoading = true

    this.forgotService.verificarEmail(this.emailDTO).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
        this.notify.info("Um Token de acesso foi enviado ao seu email")
        this.etapaAtual = 2
      }
    })

  }

  validarCodigo() {

    this.resetTokenDTO.email = this.emailDTO.email

    if(this.resetTokenDTO.token == "") {
      return;
    }

    this.isLoading = true

    this.forgotService.validarCodigo(this.resetTokenDTO).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res=> {
        this.notify.success("Codigo validado")
        this.etapaAtual = 3
      }
    })
  }

  novaSenha() {

    this.novaSenhaDTO.email = this.emailDTO.email
    this.novaSenhaDTO.token = this.resetTokenDTO.token
    
    if(this.novaSenhaDTO.novaSenha == "" || 
      this.novaSenhaDTO.novaSenha.length < 8) {
      return;
    }

    this.isLoading = true

    this.forgotService.resetarSenha(this.novaSenhaDTO).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res=> {
        this.notify.success("Senha alterada")
        this.router.navigate(["/login"])
      }
    })


  }



}
