import { Component } from '@angular/core';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { Usuario } from '../../../model/User/usuario';
import { AuthService } from '../../../core/guard/auth/auth.service';
import { Conversa, ConversaResponse} from '../../../model/conversa/conversa';
import { ConversaService } from '../../../core/service/conversa/conversa.service';
import { forkJoin, interval, map, Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConversaComponent } from "./conversa/conversa.component";

@Component({
  selector: 'app-conversas',
  imports: [CommonModule, ConversaComponent],
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
     setInterval(() => {
      this.carregarDados();
    }, 2000);

  }

  conversaSelecionada!: ConversaResponse;

  usuarios: Usuario[] = [];

  conversasDoUsuario: ConversaResponse[] = [];

  conversasDisponiveis: Usuario[] = [];

  usuarioAtual! : string;


carregarDados() {


  this.usuarioAtual = this.authService.id || '';

  forkJoin({
    usuarios: this.usuarioService.pegarTodosUsuarios(20),
    conversas: this.conversaService.pegarPorUserID(this.usuarioAtual),
  }).subscribe({
    next: ({ usuarios, conversas }) => {

      this.usuarios = usuarios;
      console.log(this.usuarioAtual)
      console.log(conversas)

      // busca mensagens de todas as conversas
      const conversasComMensagens$ = conversas.map((conversa: any) =>
        this.conversaService.listarMensagens(conversa.id).pipe(
          map((mensagens: any[]) => {

            const outroUsuarioId = conversa.participantesId.find(
              (id: string) => id !== this.usuarioAtual
            );

            const usuario = usuarios.find(
              user => user.id === outroUsuarioId
            );

            

            return {
              ...conversa,
              nome: usuario?.nome || 'Desconhecido',
              mensagem: mensagens
            };
          })
        )
      );

      forkJoin(conversasComMensagens$ as Observable<ConversaResponse>[]).subscribe({
        next: (conversasFinal) => {

          this.conversasDoUsuario = conversasFinal as ConversaResponse[];

          // usuarios que já conversaram
          const idsJaConversados = new Set<string>();

          conversasFinal.forEach(conversa => {
            conversa.participantesId.forEach((id: string) => {
              if (id !== this.usuarioAtual) {
                idsJaConversados.add(id);
              }
            });
          });

          // usuarios disponíveis
          this.conversasDisponiveis = usuarios.filter(user =>
            
            user.id !== this.usuarioAtual &&
            !idsJaConversados.has(user.id)
          );

          console.log(this.conversasDisponiveis)

        }
      });

    },
    error: err => {
      console.log(err)
    }
  });

  

}


iniciarConversa(id: string) {
    this.conversaService.salvar({
      participantesIDs: [this.usuarioAtual, id],
    }).subscribe({
      next: res => {
        console.log(res)
      }
    })

}

}
