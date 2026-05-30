import { Component, Input } from '@angular/core';
import { Chamado, ComentarioDTO } from '../../../model/chamados/chamado';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../model/User/usuario';
import { ChamadosService } from '../../../core/service/chamados/chamados.service';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { AuthService } from '../../../core/guard/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-descricao-chamado',
  imports: [CommonModule, FormsModule],
  templateUrl: './descricao-chamado.component.html',
  styleUrl: './descricao-chamado.component.scss'
})
export class DescricaoChamadoComponent {


  constructor(
    private usuarioService: UsuarioService,
    private chamadoService: ChamadosService,
    private authService: AuthService
  )
     {}

  @Input() chamado!: Chamado;

  comentario: ComentarioDTO= {
    comentario: '',
    id_usuario: ''
  };


  TodosUsuario: Usuario[] = []

  usuarioAtual! : string;
  
  idAssociado: string = '';

  ngOnInit() {

    

    this.usuarioAtual = this.authService.id || ''

    this.usuarioService.pegarTodosUsuarios(100).subscribe({
      next: res => {
        this.TodosUsuario = res;
      }
    })

    
  }

  associarUsuario(usuarioId: string) {
      this.chamado.responsavelId = usuarioId;
  }

  salvar() {

    console.log("teste")

    this.chamadoService.update(this.chamado).subscribe({
      next: res => {
        this.chamado = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  pegarNomeResponsavel(id: String): string {
    const usuario = this.TodosUsuario.find(x => x.id === id);
    return usuario ? usuario.nome : 'não definido';
  }

  adicionarComentario() {
    if (!this.comentario || this.usuarioAtual == '') {
      return;
    }

    this.comentario.id_usuario = this.usuarioAtual

    this.chamadoService.adicionarComentario(this.chamado.id, this.comentario).subscribe({
      next: res => {
        console.log(res)
        this.chamado = res;
        this.comentario = {
          comentario: '',
          id_usuario: ''
        }
      }
    });
  }

}
