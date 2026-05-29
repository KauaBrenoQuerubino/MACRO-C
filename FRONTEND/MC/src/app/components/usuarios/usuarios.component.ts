import { Component } from '@angular/core';
import { ListaUsuariosComponent } from "./lista-usuarios/lista-usuarios.component";
import { GerenciarUsuarioComponent } from "./gerenciar-usuario/gerenciar-usuario.component";


@Component({
  selector: 'app-usuarios',
  imports: [ListaUsuariosComponent, GerenciarUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent {

}
