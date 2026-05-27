import { Component, EventEmitter, Output} from '@angular/core';
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


  chamadosOpen: Chamado[] = [];
  chamadosFechados: Chamado[] = [];
  chamados: Chamado[] = [];

  constructor(private chamadosService: ChamadosService) {}

  ngOnInit(): void {
    this.listarChamados();
  }

  public listarChamados(): void {
    this.chamadosService.findAll(100).subscribe({
      next: res => {
        this.chamados = res;
      },
      error: (err) => {
        console.error('Erro ao buscar chamados', err);
      }
    });

    this.chamadosService.findByStatus('ABERTO').subscribe({
      next: res => {
        this.chamadosOpen = res;
      }
    })

    this.chamadosService.findByStatus('FECHADO').subscribe({
      next: res => {
        this.chamadosFechados = res;
      }
    })
  }

  @Output() chamadoSelecionado = new EventEmitter<Chamado>();

  selecionarChamado(chamado: Chamado): void {
    this.chamadoSelecionado.emit(chamado);
  }



}
