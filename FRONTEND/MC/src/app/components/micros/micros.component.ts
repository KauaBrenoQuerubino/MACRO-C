import { Component } from '@angular/core';
import { MicrosService } from '../../core/service/micros/micros.service';
import { Microservico } from '../../model/Micro/microservico';
import { ServicosComponent } from "./servicos/servicos.component";
import { GerenciamentoComponent } from "./gerenciamento/gerenciamento.component";
import { MatDialog } from '@angular/material/dialog';
import { CadastrarServicoComponent } from './modals/cadastrar-servico/cadastrar-servico.component';

@Component({
  selector: 'app-micros',
  imports: [ServicosComponent, GerenciamentoComponent],
  templateUrl: './micros.component.html',
  styleUrl: './micros.component.scss'
})
export class MicrosComponent {

  constructor(private dialog: MatDialog) {}

  micro!: Microservico;
  ServicoFoiSelecionado = false


  gerenciarMicro(mc: Microservico) {
    this.micro = mc;
    this.ServicoFoiSelecionado = true
  }

  voltarParaLista() {
    this.ServicoFoiSelecionado = false;
  }


  cadastrarServico() {
    this.dialog.open(CadastrarServicoComponent);
  }


}
