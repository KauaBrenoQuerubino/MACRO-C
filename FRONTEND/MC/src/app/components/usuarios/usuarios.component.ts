import { Component } from '@angular/core';
import { ListaUsuariosComponent } from "./lista-usuarios/lista-usuarios.component";
import { GerenciarUsuarioComponent } from "./gerenciar-usuario/gerenciar-usuario.component";
import { Usuario } from '../../model/User/usuario';
import { CdkAutofill } from "@angular/cdk/text-field";
import { NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkWithHref } from "@angular/router";



@Component({
  selector: 'app-usuarios',
  imports: [ListaUsuariosComponent, GerenciarUsuarioComponent, NgClass, RouterLink],
  
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

  constructor(private route: ActivatedRoute) {}

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
