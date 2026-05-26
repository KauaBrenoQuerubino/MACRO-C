import { Component } from '@angular/core';
import { ListaChamadosComponent } from './lista-chamados/lista-chamados.component';
import { AdicionarChamadosComponent } from "./adicionar-chamados/adicionar-chamados.component";
import { DescricaoChamadoComponent } from "./descricao-chamado/descricao-chamado.component";

@Component({
  selector: 'app-chamados',
  imports: [ListaChamadosComponent, AdicionarChamadosComponent, DescricaoChamadoComponent],
  templateUrl: './chamados.component.html',
  styleUrl: './chamados.component.scss'
})
export class ChamadosComponent {

}
