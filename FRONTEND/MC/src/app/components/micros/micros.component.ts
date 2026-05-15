import { Component } from '@angular/core';
import { MicrosService } from '../../core/service/micros/micros.service';
import { Microservico } from '../../model/Micro/microservico';
import { ServicosComponent } from "./servicos/servicos.component";
import { GerenciamentoComponent } from "./gerenciamento/gerenciamento.component";

@Component({
  selector: 'app-micros',
  imports: [ServicosComponent, GerenciamentoComponent],
  templateUrl: './micros.component.html',
  styleUrl: './micros.component.scss'
})
export class MicrosComponent {


  micro!: Microservico;
  ServicoFoiSelecionado = false


  gerenciarMicro(mc: Microservico) {
    this.micro = mc;
    this.ServicoFoiSelecionado = true
  }

  voltarParaLista() {
    this.ServicoFoiSelecionado = false;
  }



}
