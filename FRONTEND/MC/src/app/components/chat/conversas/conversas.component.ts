import { Component } from '@angular/core';
import { UsuarioService } from '../../../core/service/User/usuario.service';
import { Usuario } from '../../../model/User/usuario';
import { AuthService } from '../../../core/guard/auth/auth.service';
import { Conversa, ConversaResponse} from '../../../model/conversa/conversa';
import { ConversaService } from '../../../core/service/conversa/conversa.service';
import { forkJoin, interval, map, Observable, Subscription, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConversaComponent } from "./conversa/conversa.component";
import { ConfirmDialogComponent } from '../../modal-dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-conversas',
  imports: [CommonModule, ConversaComponent],
  templateUrl: './conversas.component.html',
  styleUrl: './conversas.component.scss'
})
export class ConversasComponent {
  microService: any;
  servico: any;

  constructor (
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private conversaService: ConversaService,
    private dialog: MatDialog
  ) {}

  private sub?: Subscription;

  ngOnInit() {
    
    setInterval(() => {
      this.carregarDados();
    }, 5000);
    
  
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
              FotoPerfil: usuario?.FotoPerfil || '',
              nome: usuario?.nome || 'Desconhecido',
              mensagem: mensagens
            };
          })
        )
      );

      if (conversas.length === 0) {

          this.conversasDoUsuario = [];

          this.conversasDisponiveis = usuarios.filter(user =>
            user.id !== this.usuarioAtual
          );

          return; 
      }

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

        }
      });

    },
    error: err => {
      console.log(err)
    }
  });

}


iniciarConversa(id: string) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          titulo: 'Confirmação',
          mensagem: 'Deseja Iniciar uma conversa?'
        }
        }
      );
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.conversaService.salvar({
            participantesIDs: [this.usuarioAtual, id],
          }).subscribe({})
          this.carregarDados()
        } 
      });


}

}
