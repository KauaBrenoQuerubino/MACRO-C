import { Component } from '@angular/core';
import { ListaChamadosComponent } from './lista-chamados/lista-chamados.component';
import { AdicionarChamadosComponent } from "./adicionar-chamados/adicionar-chamados.component";
import { DescricaoChamadoComponent } from "./descricao-chamado/descricao-chamado.component";
import { Chamado } from '../../model/chamados/chamado';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chamados',
  imports: [ListaChamadosComponent, AdicionarChamadosComponent, DescricaoChamadoComponent, RouterLink],
  templateUrl: './chamados.component.html',
  styleUrl: './chamados.component.scss'
})
export class ChamadosComponent {

  AreaSelecionada = 'lista-chamados';

  chamado!: Chamado;

  selecionarChamado(chamado: Chamado) {
    this.chamado = chamado;
    this.AreaSelecionada = 'descricao-chamado';

  }

  

}
