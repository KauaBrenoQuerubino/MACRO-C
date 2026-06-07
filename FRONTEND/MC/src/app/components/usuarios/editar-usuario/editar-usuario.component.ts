import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario } from '../../../model/User/usuario';
import { GerenciarUsuarioComponent } from '../gerenciar-usuario/gerenciar-usuario.component';
import { NgClass } from '@angular/common';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { AuthService } from '../../../core/guard/auth/auth.service';

@Component({
  selector: 'app-editar-usuario',
  imports: [GerenciarUsuarioComponent, NgClass, RouterLink],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.scss'
})
export class EditarUsuarioComponent {
 constructor(
  private route: ActivatedRoute,
  private usuarioService: UsuarioService,
  private authService: AuthService) {}

  ngOnInit() {
    if(this.authService.id){
      this.usuarioService.pegarUsuarioPorId(this.authService.id).subscribe({
        next: res => {
          this.usuario = res
          this.carregou = true
        }
      })
    }
    
  }

  carregou = false

  usuario!: Usuario;

  gerenciarUsuario = false;  

  selecionarUsuario(usuario: Usuario) {
    this.usuario = usuario;
    this.gerenciarUsuario = true;
  }

  criarUsuario() {
    this.usuario = {
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

    this.gerenciarUsuario = true;
  }

  cancelarGerenciamento() {

    this.gerenciarUsuario = false

    this.usuario = {
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
  }
}
