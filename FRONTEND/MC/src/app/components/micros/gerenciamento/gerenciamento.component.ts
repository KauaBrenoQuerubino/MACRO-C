import { Component } from '@angular/core';
import { MicrosService } from '../../../core/service/micros/micros.service';
import { Microservico } from '../../../model/Micro/microservico';

@Component({
  selector: 'app-gerenciamento',
  imports: [],
  templateUrl: './gerenciamento.component.html',
  styleUrl: './gerenciamento.component.scss'
})
export class GerenciamentoComponent {


      constructor(
        private microService: MicrosService,
      ) { }
  
      ngOnInit(){
        
      }
  
      servicos: Microservico | undefined;
}
