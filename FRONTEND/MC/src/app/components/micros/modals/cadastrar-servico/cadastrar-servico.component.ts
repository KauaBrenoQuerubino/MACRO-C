import { Component } from '@angular/core';
import { GerenciarRequestsComponent } from "../gerenciar-requests/gerenciar-requests.component";
import { Microservico } from '../../../../model/Micro/microservico';
import { FormsModule } from '@angular/forms';
import { MicrosService } from '../../../../core/service/micros/micros.service';

@Component({
  selector: 'app-cadastrar-servico',
  imports: [GerenciarRequestsComponent, FormsModule],
  templateUrl: './cadastrar-servico.component.html',
  styleUrl: './cadastrar-servico.component.scss'
})
export class CadastrarServicoComponent {

  
  constructor(private microService: MicrosService) { }

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
    }

  adicionarRequestSelecionado = false;
  
  receberRetorno(valor: Microservico) {

    this.adicionarRequestSelecionado = false;
    this.servico = valor;

  }

  salvar() {

    console.log(this.servico)

    this.microService.salvar(this.servico).subscribe({
      next: res => {
        console.log(res)
      }
    })
  }



}

