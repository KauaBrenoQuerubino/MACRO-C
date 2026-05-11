import { Component } from '@angular/core';
import { ChamadosService } from '../../service/chamados/chamados.service';
import { Chamado } from '../../model/chamados/chamado';
import { MicrosService } from '../../service/micros/micros.service';
import { Microservico } from '../../model/Micro/microservico';
import { UsuarioService } from '../../service/User/usuario.service';
import { Usuario } from '../../model/User/usuario';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    private chamadosService: ChamadosService, 
    private microService: MicrosService,
    private usuarioService: UsuarioService
  ) { }

  chamadosOpen: number = 0;
  servicosAtivos: number = 0;
  servicosComErro: number = 0;

  servicos: Microservico[] = [];
  usuarios: Usuario[] = [];

  ngOnInit() {
    this.carregarValores()
  }



  carregarValores() {
    this.chamadosService.findByStatus("ABERTO").subscribe({
          next: res => {
            this.chamadosOpen = res.length

          },
          error: err => {
            
          }
        })
    
    this.microService.pegarTodosMicros(20).subscribe({
      next: res => {
          this.servicos = res;

          this.servicosAtivos = this.servicos.filter(
            micro => micro.status === 'UP'
          ).length

           this.servicosComErro= this.servicos.filter(
            micro => micro.status === 'DOWN'
          ).length
      }
    })

    this.usuarioService.pegarTodosUsuarios(20).subscribe({
      next: res => {
          this.usuarios= res;

        
      }
    })

  }
}
