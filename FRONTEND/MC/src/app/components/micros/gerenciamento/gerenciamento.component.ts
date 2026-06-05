import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MicrosService } from '../../../core/service/micros/micros.service';
import { Microservico, RequisicaoDTO } from '../../../model/Micro/microservico';
import { FormsModule } from '@angular/forms';
import { NgClass } from "../../../../../node_modules/@angular/common/common_module.d-NEF7UaHr";
import { MatDialog } from '@angular/material/dialog';
import { GerenciarRequestsComponent } from '../modals/gerenciar-requests/gerenciar-requests.component';
import { ConfirmDialogComponent } from '../../modal-dialog/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../until/notification.service';

@Component({
  selector: 'app-gerenciamento',
  imports: [FormsModule, CommonModule],
  templateUrl: './gerenciamento.component.html',
  styleUrl: './gerenciamento.component.scss'
})
export class GerenciamentoComponent {


  editMode = false

  consoleReturn = {}

  constructor(
    private microService: MicrosService,
    private dialog: MatDialog,
    private notify: NotificationService
    ) {}
  
  ngOnInit() {
    setInterval(() => {
      this.atualizarDados();
    }, 30000); // 30 segundos
  }

  servicoRollBack!: Microservico;

  @Input() servico!: Microservico;


  editarServico() {

    this.servicoRollBack = JSON.parse(JSON.stringify(this.servico));

    this.editMode = true;

  }

  cancelarEdicao() {
    this.editMode = false;
    this.servico = this.servicoRollBack
  }

  @Output() deletar = new EventEmitter<any>()

  deletarServico() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmação',
        mensagem: 'Deseja realmente excluir?'
      }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.microService.deletar(this.servico.id).subscribe({
          next: res => {
            this.notify.success('Requisicao Deletada');
            this.deletar.emit(true)
          }
        })
      } 
    });

  }

  executarAcao(id: string, acao: string) {
      this.microService.executarAcao(acao, id).subscribe({})
  }

  atualizarDados() {
    this.microService.pegarPorId(this.servico.id).subscribe({
      next: res => {
        this.servico.status = res.status;
        this.servico.responseTime = res.responseTime
      }
    })
  }

  adicionarRequest() {
    this.dialog.open(GerenciarRequestsComponent, {
       panelClass: 'cadastro-modal',
       data: {
         servico: this.servico,
       }
    })
  }

  editarRequest(index: number) {
    this.dialog.open(GerenciarRequestsComponent, {
       panelClass: 'cadastro-modal',
       data: {
         request: this.servico.requisicoes[index],
         servico: this.servico,
         index: index
       }
    })
  }

  apagarRequest(index: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        titulo: 'Confirmação',
        mensagem: 'Deseja realmente excluir?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servico.requisicoes.splice(index, 1);
        this.notify.success('Requisicao Deletada');
      } 
    });

  }

  enviarRequisicao(requisicao: RequisicaoDTO) {
    console.log(requisicao)
    this.microService.enviarRequisicao(this.servico.id, requisicao).subscribe({
      next: res=> {
        console.log(res)

        this.consoleReturn = res
      }
    })
  }

  salvar() {
    this.microService.atualizar(this.servico).subscribe({
      next: res => {
        this.editMode = false;
        this.notify.success('Servico atualizado');
      }
    })
  }

      
}
