import { Component, EventEmitter, Output} from '@angular/core';
import { ChamadosService } from '../../../core/service/chamados/chamados.service';
import { Chamado } from '../../../model/chamados/chamado';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-chamados',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-chamados.component.html',
  styleUrl: './lista-chamados.component.scss'
})
export class ListaChamadosComponent {

  filtroTexto: string = '';
  filtroStatus: string = '';
  filtroCategoria: string = '';
  filtroPrioridade: string = '';

  chamadosFiltrados: any[] = [];

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
        this.chamadosFiltrados = this.chamados;
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

  aplicarFiltros() {
    this.chamadosFiltrados = this.chamados.filter(chamado => {

        const matchTexto =
          chamado.id.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
          chamado.titulo.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
          chamado.descricao.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
          chamado.prioridade.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
          chamado.status.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
          chamado.categoria.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
          chamado.usuarioId.toLowerCase().includes(this.filtroTexto.toLowerCase()) ||
          chamado.responsavelId.toLowerCase().includes(this.filtroTexto.toLowerCase());


        const matchCategoria = this.filtroCategoria
          ? chamado.categoria === this.filtroCategoria
          : true;

        const matchStatus = this.filtroStatus
          ? chamado.status === this.filtroStatus
          : true;

        const matchPrioridade = this.filtroPrioridade
          ? chamado.prioridade === this.filtroPrioridade
          : true;


        return matchTexto && matchStatus && matchPrioridade && matchCategoria;
      
      });
  }



}
