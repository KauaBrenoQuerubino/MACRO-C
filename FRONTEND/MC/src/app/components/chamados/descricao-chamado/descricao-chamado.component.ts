import { Component, Input } from '@angular/core';
import { Chamado } from '../../../model/chamados/chamado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-descricao-chamado',
  imports: [CommonModule],
  templateUrl: './descricao-chamado.component.html',
  styleUrl: './descricao-chamado.component.scss'
})
export class DescricaoChamadoComponent {


  @Input() chamado!: Chamado;



}
