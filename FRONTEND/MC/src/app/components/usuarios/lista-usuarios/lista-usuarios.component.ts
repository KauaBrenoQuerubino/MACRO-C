import { Component, EventEmitter, Output } from '@angular/core';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { Usuario } from '../../../model/User/usuario';

@Component({
  selector: 'app-lista-usuarios',
  imports: [],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.scss'
})
export class ListaUsuariosComponent {

  constructor(private usuarioService: UsuarioService) {}

  usuarios: Usuario[] = [];

  


  ngOnInit(){

    this.usuarioService.pegarTodosUsuarios(100).subscribe({
      next: res => {
        this.usuarios = res;
      }
    })

  }


  @Output() usuarioSelecionado = new EventEmitter<Usuario>();

  selecionarUsuario(usuario: Usuario) {
    this.usuarioSelecionado.emit(usuario);
  }


}
