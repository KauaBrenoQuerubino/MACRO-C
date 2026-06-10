import { Component, EventEmitter, Output } from '@angular/core';
import { MicrosService } from '../../../core/service/micros/micros.service';
import { Microservico } from '../../../model/Micro/microservico';
import { finalize } from 'rxjs';
import { LodingComponent } from "../../../until/loding/loding.component";
import { NotificationService } from '../../../until/notification.service';

@Component({
  selector: 'app-servicos',
  imports: [LodingComponent],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent {

  constructor(
    private microService: MicrosService,
    private notify: NotificationService
  ) { }

  isLoading = true

  ngOnInit(){
      this.carregarServicos()
    }

  servicos: Microservico[] = [];

  carregarServicos() {
      this.microService.pegarTodosMicros(20).pipe(finalize(() => this.isLoading = false)).subscribe({
      next: res => {
          this.servicos = res;
      }, error: err => {
            this.notify.error(err.error.message)
            
          }
    })
  }

  executarAcao(id: string, status: string) {

    let acao = (status == 'UP') ? 'stop' : 'start'

    const micro = this.servicos.find(m => m.id === id);

    if (!micro) return;

    this.microService.executarAcao(acao, id).subscribe({
        next: res => {
          console.log(res)
            micro.status =  status === 'UP' ? 'DOWN' : 'UP'
         }, error: err => {
            this.notify.error(err.error.message)
          }
      }
      )

  }

  @Output() Dado = new EventEmitter<Microservico>();

  Enviar(mc: Microservico) {
    this.Dado.emit(mc);
  }



}
