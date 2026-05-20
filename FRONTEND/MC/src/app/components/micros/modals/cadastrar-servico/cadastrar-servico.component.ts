import { Component } from '@angular/core';
import { GerenciarRequestsComponent } from "../gerenciar-requests/gerenciar-requests.component";
import { Microservico } from '../../../../model/Micro/microservico';
import { FormsModule } from '@angular/forms';
import { MicrosService } from '../../../../core/service/micros/micros.service';
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-cadastrar-servico',
  imports: [GerenciarRequestsComponent, FormsModule, NgClass],
  standalone: true,
  templateUrl: './cadastrar-servico.component.html',
  styleUrl: './cadastrar-servico.component.scss'
})
export class CadastrarServicoComponent {

  
  constructor(private microService: MicrosService, private dialog: MatDialog) { }


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
    ) return;

    this.microService.salvar(this.servico).subscribe({
      next: res => {
        console.log(res)
      }
    })
  }

  fecharModal() {
      this.dialog.closeAll()
  }



}

