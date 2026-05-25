import { Component, signal } from '@angular/core';
import { ChamadosService } from '../../../core/service/chamados/chamados.service';
import { Chamado } from '../../../model/chamados/chamado';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-chamados',
  imports: [CommonModule],
  templateUrl: './lista-chamados.component.html',
  styleUrl: './lista-chamados.component.scss'
})
export class ListaChamadosComponent {



  public chamados: Chamado[] = [];

  constructor(private chamadosService: ChamadosService) {}

  ngOnInit(): void {
    this.listarChamados();
  }

  public listarChamados(): void {
    this.chamadosService.findAll(100).subscribe({
      next: res => {
        this.chamados = res;
        console.log(this.chamados);
      },
      error: (err) => {
        console.error('Erro ao buscar chamados', err);
      }
    });
  }


}
