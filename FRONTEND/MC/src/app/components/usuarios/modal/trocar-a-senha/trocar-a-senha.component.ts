import { Component } from '@angular/core';
import { UsuarioService } from '../../../../core/service/User/usuario.service';
import { AuthService } from '../../../../core/guard/auth/auth.service';
import { UpdateSenhaDTO } from '../../../../model/User/usuario';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../until/notification.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-trocar-a-senha',
  imports: [FormsModule],
  templateUrl: './trocar-a-senha.component.html',
  styleUrl: './trocar-a-senha.component.scss'
})
export class TrocarASenhaComponent {

  constructor(
    private authService: AuthService,
    private notify: NotificationService,
    private dialogRef: DialogRef<TrocarASenhaComponent>
  ){
    if(authService.id){
      this.usuarioAtual = authService.id
    }
  }

  updateSenhaDTO: UpdateSenhaDTO = {
    senhaAtual: '',
    novaSenha: ''
  }



  novaSenha = ''
  confirmarSenha = ''
  usuarioAtual!: string;

  alterarSenha() {

    if(this.novaSenha != this.confirmarSenha){
      this.notify.error("As senhas nao sao iguais")
      return;
    }

    if(this.novaSenha == "", this.confirmarSenha == "", this.updateSenhaDTO.senhaAtual == ""){
      this.notify.error("Preencha todos os campos!")
      return;
    }

    this.updateSenhaDTO.novaSenha = this.novaSenha

    this.authService.alterarSenha(this.usuarioAtual, this.updateSenhaDTO).subscribe({
      next: res => {
        this.notify.success("Senha alterada com sucesso")
        this.dialogRef.close()
      }
      , error: err => {
            this.notify.error(err.error.message)
            
          }
    })


  }




}
