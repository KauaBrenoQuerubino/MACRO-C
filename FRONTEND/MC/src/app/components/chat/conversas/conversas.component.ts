import { Component } from '@angular/core';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { Usuario } from '../../../model/User/usuario';
import { AuthService } from '../../../core/guard/auth/auth.service';
import { Conversa, ConversaDTO } from '../../../model/conversa/conversa';
import { ConversaService } from '../../../core/service/conversa/conversa.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-conversas',
  imports: [],
  templateUrl: './conversas.component.html',
  styleUrl: './conversas.component.scss'
})
export class ConversasComponent {

  constructor (
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private conversaService: ConversaService
  ) {}

  ngOnInit() {
    this.carregarDados()

  }

  usuarios: Usuario[] = [];

  conversasDoUsuario: ConversaDTO[] = [];

  conversasDisponiveis: Usuario[] = [];

  usuarioAtual! : string;


carregarDados() {

  this.usuarioAtual = this.authService.id || '';

  forkJoin({
    usuarios: this.usuarioService.pegarTodosUsuarios(20),
    conversas: this.conversaService.pegarPorUserID(this.usuarioAtual)
  }).subscribe({
    next: ({ usuarios, conversas }) => {

      this.usuarios = usuarios;
      this.conversasDoUsuario = conversas;

      // usuarios que já conversaram com o usuário atual
      const idsJaConversados = new Set<string>();
      const nomesJaConversados = new Set<string>();


      this.conversasDoUsuario = conversas.map((conversa: any) => {

        const outroUsuarioId = conversa.participantesId.find(
          (id: string) => id !== this.usuarioAtual
        );

        const usuario = usuarios.find(
          user => user.id === outroUsuarioId
        );

        return {
          ...conversa,
          nome: usuario?.nome || 'Desconhecido'
        };
        
      });

      // usuarios disponiveis = usuarios sem conversa
      this.conversasDisponiveis = usuarios.filter(user =>
        user.id !== this.usuarioAtual &&
        !idsJaConversados.has(user.id)
      );

    }
  });




}


}


