import { Component } from '@angular/core';
import { ListaChamadosComponent } from './lista-chamados/lista-chamados.component';

@Component({
  selector: 'app-chamados',
  imports: [ListaChamadosComponent],
  templateUrl: './chamados.component.html',
  styleUrl: './chamados.component.scss'
})
export class ChamadosComponent {

}
