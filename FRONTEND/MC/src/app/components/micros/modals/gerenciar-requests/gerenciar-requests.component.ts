
import { Component, EventEmitter, Input, Optional, Output, Inject} from '@angular/core';
import { Microservico, RequisicaoDTO } from '../../../../model/Micro/microservico';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-gerenciar-requests',
  imports: [FormsModule, CommonModule],

  templateUrl: './gerenciar-requests.component.html',
  styleUrl: './gerenciar-requests.component.scss'
})
export class GerenciarRequestsComponent {

  
  constructor(
    private dialog: MatDialog,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any, 
    @Optional() @Inject(MAT_DIALOG_DATA) public requestData: any,
    @Optional() @Inject(MAT_DIALOG_DATA) public index: number,
    public dialogRef: MatDialogRef<GerenciarRequestsComponent>
  ) {}
  
  
  ngOnInit() {

    if(this.requestData?.request) {
      this.request = this.requestData.request;
      this.servico = this.requestData.servico;
      this.indexEdicao = this.index;

      if (this.request.body) {
        this.body = Object.keys(this.request.body).map(key => ({
          type: typeof this.request.body[key],
          key: key,
          value: this.request.body[key]
        }
      ));

        console.log(this.request.body)
        console.log(this.body)
      
      }

    }

    if (this.data?.servico) {
      this.servico = this.data.servico;
      
    }

  }
  

  indexEdicao: number | null = null;


  @Input() servico: Microservico = {
    id: '',
    nome: '',
    url: '',
    requisicoes: [],
    descricao: '',
    status: '',
    healthEndpoint: '',
    responseTime: 0
  };

  
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

  apagarBody(index: number) {

    if(this.body.length === 1) {
      this.body = [{
        type: '',
        key: '',
        value: ''
      }]
      return
    }

    this.body.splice(index, 1);
  }

  apagarQueryParam(index: number) {

    if(this.queryParams.length === 1) {
      this.queryParams = [
        { key: '', value: '' }
      ];
      return
    }

    this.queryParams.splice(index, 1);
  }

  apagarHeader(index: number) {

    if(this.headers.length === 1) {
      this.headers = [
        { key: '', value: '' }
      ];
      return
    }


    this.headers.splice(index, 1);
  }


  @Output() cancel = new EventEmitter<void>();


  fecharModal() {
    if(this.data == null) {
      this.cancel.emit() ;
      return
    }
    this.dialogRef.close()
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

    if (this.indexEdicao !== null) {
      this.servico.requisicoes[this.indexEdicao] = this.request;
    } else {
      this.servico.requisicoes.push(this.request);
    }


    this.retorno.emit(this.servico);

    this.fecharModal()
  
  
  }




}


