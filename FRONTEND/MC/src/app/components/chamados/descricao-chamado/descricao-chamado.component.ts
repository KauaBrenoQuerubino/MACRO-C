import { Component, Input } from '@angular/core';
import { Chamado } from '../../../model/chamados/chamado';

@Component({
  selector: 'app-descricao-chamado',
  imports: [],
  templateUrl: './descricao-chamado.component.html',
  styleUrl: './descricao-chamado.component.scss'
})
export class DescricaoChamadoComponent {


  @Input() chamado!: Chamado;

}
