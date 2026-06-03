import { Component } from '@angular/core';
import { MicrosService } from '../../core/service/micros/micros.service';
import { Microservico } from '../../model/Micro/microservico';
import { ServicosComponent } from "./servicos/servicos.component";
import { GerenciamentoComponent } from "./gerenciamento/gerenciamento.component";
import { MatDialog } from '@angular/material/dialog';
import { CadastrarServicoComponent } from './modals/cadastrar-servico/cadastrar-servico.component';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-micros',
  imports: [ServicosComponent, GerenciamentoComponent, NgClass, RouterLink],
  templateUrl: './micros.component.html',
  styleUrl: './micros.component.scss'
})
export class MicrosComponent {

  constructor(private dialog: MatDialog, private router: Router) {}

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
    this.dialog.open(CadastrarServicoComponent, {
      panelClass: 'cadastro-modal'
    });
  }

  irPara(destino: string) {
    this.router.navigate([`/${destino}`])
  }


}
