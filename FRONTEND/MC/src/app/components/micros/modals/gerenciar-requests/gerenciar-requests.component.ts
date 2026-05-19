import { Component, EventEmitter, Input, input, Output } from '@angular/core';
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
    

    body = [{
      type: '',
      key: '',
      value: ''
    }]

    queryParams = [
      { key: '', value: '' }
    ];

    headers = [
      { key: '', value: '' }
    ];


  adicionarBody() {
    this.body.push({
      type: '',
      value: '',
      key: ''
    });
  }

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


  @Output() retorno = new EventEmitter<Microservico>();


  salvar() {

    this.request.headers = Object.fromEntries(
      this.headers
        .filter(h => h.key && h.key.trim() !== '')
        .map(h => [h.key, h.value])
    );

    this.request.queryParams = Object.fromEntries(
      this.queryParams
        .filter(q => q.key && q.key.trim() !== '')
        .map(q => [q.key, q.value])
    );

    this.request.body = Object.fromEntries(
      this.body
        .filter(b => b.key && b.key.trim() !== '')
        .map(b => [b.key, b.value])
    );

  this.servico.requisicoes.push(this.request);

  this.retorno.emit(this.servico);
  
}




}
