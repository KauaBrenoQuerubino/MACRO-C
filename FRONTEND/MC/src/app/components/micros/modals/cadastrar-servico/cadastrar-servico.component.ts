import { Component } from '@angular/core';
import { GerenciarRequestsComponent } from "../gerenciar-requests/gerenciar-requests.component";
import { Microservico } from '../../../../model/Micro/microservico';
import { FormsModule } from '@angular/forms';
import { MicrosService } from '../../../../core/service/micros/micros.service';
import { NgClass } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ConfirmDialogComponent } from '../../../modal-dialog/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../../../until/notification.service';


@Component({
  selector: 'app-cadastrar-servico',
  imports: [GerenciarRequestsComponent, FormsModule, NgClass],
  standalone: true,
  templateUrl: './cadastrar-servico.component.html',
  styleUrl: './cadastrar-servico.component.scss'
})
export class CadastrarServicoComponent {

  
  constructor(
    private microService: MicrosService, 
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CadastrarServicoComponent>,
    private notify: NotificationService
  ) { }


  servico: Microservico = 
    {
      id: 'Nao iniciado',
      nome: '',
      url: '',
      descricao: '',

      requisicoes: [],

      status: 'DOWN',
      healthEndpoint: '',
      responseTime: 0,
    }

  adicionarRequestSelecionado = false;
  
  receberRetorno(valor: Microservico) {

    this.adicionarRequestSelecionado = false;
    this.servico = valor;

  }

  salvar() {

    if(
      this.servico.nome == '' || 
      this.servico.url == '' || 
      this.servico.descricao == '' ||
      this.servico.healthEndpoint== ''
    ) {
      this.notify.error('Todos os campos precisam estar preenchidos');
      return;
    };

    this.microService.salvar(this.servico).subscribe({
      next: res => {
        this.notify.success('Servico cadastrado com sucesso');
        this.dialogRef.close(true)
      },
      error: err => {
        this.notify.error('Houve um erro ao cadastrar o servico');
      }
      })
  }

  fecharModal() {
    this.dialog.closeAll()
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
      } 
    });

  }


}

