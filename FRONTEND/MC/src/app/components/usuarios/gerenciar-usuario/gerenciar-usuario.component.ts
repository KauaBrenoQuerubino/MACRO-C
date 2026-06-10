import { Component, Input } from '@angular/core';
import { UpdateUsuarioDTO, Usuario, UsuarioDTO } from '../../../model/User/usuario';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modal-dialog/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../../until/notification.service';
import { TrocarASenhaComponent } from '../modal/trocar-a-senha/trocar-a-senha.component';

@Component({
  selector: 'app-gerenciar-usuario',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './gerenciar-usuario.component.html',
  styleUrl: './gerenciar-usuario.component.scss'
})
export class GerenciarUsuarioComponent {


  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private notify: NotificationService) { }

  form!: FormGroup;
  submitted = false;


  @Input() usuario: Usuario = {
    id: '',
    FotoPerfil: '',
    nome: '',
    email: '',
    senhaHash: '',
    perfil: '',
    status: '',
    createdAt: '',
    updatedAt: ''
  };

  editMode = false;

  modoDeEnvio = 'Criar'

  usuarioRollback!:Usuario;

  ngOnInit() {

    if(this.usuario == null || this.usuario.createdAt == '') {
      this.modoDeEnvio = 'Criar'
      this.editMode = true;
    }
    else {
      this.modoDeEnvio = 'Editar'
    }

  }

  criarUsuario() {

     if (!this.usuario.email || this.usuario.email.trim() === '') {
      this.notify.error('O Email nao pode estar vazio');
      return;
    }

    if (!this.usuario.nome || this.usuario.nome.trim() === '') {
      this.notify.error('O Nome nao pode estar vazio');
      return;
    }

    if (!this.usuario.senhaHash || this.usuario.senhaHash.trim() === '') {
      this.notify.error('A senha nao pode estar vazia');
      return;
    }

    if (this.usuario.senhaHash.length < 8) {
      this.notify.error('A senha precisa ter mais de 8 caracteres');
      return;
    }

    if (!this.usuario.status || this.usuario.status.trim() === '') {
      this.notify.error('O status nao pode estar vazio');
      return;
    }

    if (!this.usuario.perfil || this.usuario.perfil.trim() === '') {
      this.notify.error('O Perfil nao pode estar vazio');
      return;
    }

    const userDTO: UsuarioDTO = {
      FotoPerfil: this.usuario.FotoPerfil,
      nome: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senhaHash,
      perfil: this.usuario.perfil,
      status: this.usuario.status

    } 

    this.usuarioService.criarUsuario(userDTO).subscribe({
      next: res => {
        this.notify.success('Usuario Cadastrado!');
      },
      error: err => {
        this.notify.error(err.error.message);
      }
    })
  }

  deletarUsuario() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmação',
        mensagem: 'Deseja realmente excluir?'
      }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.deletarUsuario(this.usuario.id).subscribe({
          next: res => {
           window.location.reload()
          }
        })
      } 
    });
  }

  editarUsuario() {
    this.usuarioRollback = JSON.parse(JSON.stringify(this.usuario));
    this.editMode = true;

  }

  cancelarEdicao() {
    this.editMode = false;
    this.usuario = this.usuarioRollback
  }

  alterarSenha(){
    this.dialog.open(TrocarASenhaComponent, {
      panelClass: 'alterar-senha'
    });

  }


  salvarEdicao() {
    const userDTO: UpdateUsuarioDTO = {
      fotoPerfil: this.usuario.FotoPerfil,
      nome:  this.usuario.nome,
      email: this.usuario.email,
      perfil: this.usuario.perfil,
      status: this.usuario.status

    }

    console.log(userDTO)

    this.usuarioService.editarUsuario(this.usuario.id, userDTO).subscribe({
      next: res => {
        this.notify.success('Dados Salvos!');
        console.log(res)
      },
      error: erro => {
        console.log(erro)
      }
    })
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      const base64: string = await this.converterParaBase64(file);
      this.usuario.FotoPerfil = base64.split(',')[1];
    }
  }

  converterParaBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      

      reader.onload = () => {
        resolve(reader.result as string); 
      };
      reader.onerror = error => reject(error);
    });
  }

}
