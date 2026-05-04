import { Component } from '@angular/core';
import { ChamadosService } from '../../service/chamados/chamados.service';
import { Chamado } from '../../model/chamados/chamado';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private chamadosService: ChamadosService) { }

  chamadosOpen: number = 0;
  servicosAtivos: number = 0;
  servicosComErro: number = 0;

  ngOnInit() {
    
  }



  carregarValores() {
    this.chamadosService.findByStatus("ABERTO").subscribe({
          next: res => {
            console.log(res.length)
            this.chamadosOpen = res.length

          },
          error: err => {
            
          }
        })

  }
}
