import { Component, Input } from '@angular/core';
import { ConversaResponse, Mensagem } from '../../../../model/conversa/conversa';
import { interval, Subscription, switchMap } from 'rxjs';
import { ConversaService } from '../../../../core/service/conversa/conversa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-conversa',
  imports: [FormsModule, NgClass, CommonModule],
  templateUrl: './conversa.component.html',
  styleUrl: './conversa.component.scss'
})
export class ConversaComponent {

  constructor(private conversaService: ConversaService) {}

  private sub?: Subscription;

  ngOnInit() {

   this.sub = interval(2000)
    .pipe(
      switchMap(() =>
        this.conversaService.listarMensagens(this.conversa.id)
      )
    )
    .subscribe(mensagens => {
      this.conversa.mensagem = mensagens;
    });



    const destinatario = this.conversa.participantesId.find(
      id => id !== this.usuarioAtual
    );

    this.mensagem = {
      idRemetente: this.usuarioAtual,
      idDestinatario: destinatario || '',
      conteudo: '',
    }

  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  @Input() conversa!: ConversaResponse;

  @Input() usuarioAtual!: string;


  mensagem!: Mensagem;


  enviarMensagem() {

    if(this.mensagem.conteudo == '') return;

    this.conversaService.enviarMensagem(this.conversa.id, this.mensagem).subscribe({
      next: res => {
        console.log(res)
      
      }
    });

    this.mensagem.conteudo = '';
    
  }




}
