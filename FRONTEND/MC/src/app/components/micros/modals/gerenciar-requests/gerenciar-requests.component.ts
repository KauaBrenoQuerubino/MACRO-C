import { Component, Input, input } from '@angular/core';
import { Microservico, RequisicaoDTO } from '../../../../model/Micro/microservico';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerenciar-requests',
  imports: [FormsModule,  CommonModule],
  templateUrl: './gerenciar-requests.component.html',
  styleUrl: './gerenciar-requests.component.scss'
})
export class GerenciarRequestsComponent {
  
  @Input() servico!: Microservico;

  request: RequisicaoDTO =  {
      endpoints: '',
      metodo: 'GET',
      headers: {},
      queryParams: {},
      body: null
    };

    querySelecionado = false 
    headersSelecionado = false
    bodySelecionado = false

    queryParams = [
      { key: '', value: '' }
    ];

    headers = [
      { key: '', value: '' }
    ];

    adicionarQueryParam() {
    this.queryParams.push({
      key: '',
      value: ''
    });
  }

  adicionarHeader() {
    this.headers.push({
      key: '',
      value: ''
    });
  }

  salvar() {

  this.request.headers = Object.fromEntries(
    this.headers.map(h => [h.key, h.value])
  );

  this.request.queryParams = Object.fromEntries(
    this.queryParams.map(q => [q.key, q.value])
  );

  console.log(this.request);
}




}
