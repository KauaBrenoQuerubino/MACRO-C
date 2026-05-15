import { Component } from '@angular/core';
import { GerenciarRequestsComponent } from "../gerenciar-requests/gerenciar-requests.component";
import { Microservico } from '../../../../model/Micro/microservico';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastrar-servico',
  imports: [GerenciarRequestsComponent, FormsModule],
  templateUrl: './cadastrar-servico.component.html',
  styleUrl: './cadastrar-servico.component.scss'
})
export class CadastrarServicoComponent {


  servico: Microservico = 
    {
      id: 'Nao iniciado',
      nome: '',
      url: '',
      descricao: '',

      requisicoes: [],

      status: '',
      healthEndpoint: '',
      responseTime: 0,
      createdAt:  new Date(),
      updatedAt: new Date()
    }

    adicionarRequestSelecionado = false;



}

