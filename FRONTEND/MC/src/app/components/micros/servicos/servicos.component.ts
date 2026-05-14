import { Component } from '@angular/core';
import { MicrosService } from '../../../core/service/micros/micros.service';
import { Microservico } from '../../../model/Micro/microservico';

@Component({
  selector: 'app-servicos',
  imports: [],
  templateUrl: './servicos.component.html',
  styleUrl: './servicos.component.scss'
})
export class ServicosComponent {

      constructor(
      private microService: MicrosService,
    ) { }

    ngOnInit(){
      this.carregarServicos()
    }


    servicos: Microservico[] = [];


    carregarServicos() {
       this.microService.pegarTodosMicros(20).subscribe({
      next: res => {
          this.servicos = res;
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
         }
      }
      )

  }

}
