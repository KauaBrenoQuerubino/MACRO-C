import { Component, Input } from '@angular/core';
import { ConversaResponse } from '../../../../model/conversa/conversa';
import { interval, switchMap } from 'rxjs';
import { ConversaService } from '../../../../core/service/conversa/conversa.service';

@Component({
  selector: 'app-conversa',
  imports: [],
  templateUrl: './conversa.component.html',
  styleUrl: './conversa.component.scss'
})
export class ConversaComponent {

  constructor(private conversaService: ConversaService) {}

  ngOnInit() {

  interval(2000)
    .pipe(
      switchMap(() =>
        this.conversaService.listarMensagens(this.conversa.id)
      )
    )
    .subscribe(mensagens => {
      this.conversa.mensagem = mensagens;
    });

}

  @Input() conversa!: ConversaResponse;

}
