import { Component } from '@angular/core';

import { Chamado } from '../../model/chamados/chamado';

import { Microservico } from '../../model/Micro/microservico';

import { Usuario } from '../../model/User/usuario';
import { ChamadosService } from '../../core/service/chamados/chamados.service';
import { MicrosService } from '../../core/service/micros/micros.service';
import { UsuarioService } from '../../core/service/User/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { CadastrarServicoComponent } from '../micros/modals/cadastrar-servico/cadastrar-servico.component';
import { GerenciamentoComponent } from '../micros/gerenciamento/gerenciamento.component';
import { GerenciarRequestsComponent } from '../micros/modals/gerenciar-requests/gerenciar-requests.component';

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
    private usuarioService: UsuarioService,
    private dialog: MatDialog
  ) { }

  chamadosOpen: number = 0;
  servicosAtivos: number = 0;
  servicosComErro: number = 0;

  servicos: Microservico[] = [];
  usuarios: Usuario[] = [];

  ngOnInit() {

    this.cadastrarServico()
    
    this.carregarValores()

    setInterval(() => {
      this.carregarValores();
    }, 30000);
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

  executarAcao(id: string, status: string) {

    let acao = (status == 'UP') ? 'stop' : 'start'

    const micro = this.servicos.find(m => m.id === id);

    if (!micro) return;

    this.microService.executarAcao(acao, id).subscribe({
        next: res => {
          console.log(res)
            micro.status =  status === 'UP' ? 'DOWN' : 'UP'
         }
      }
      )

  }

    cadastrarServico() {
      this.dialog.open(CadastrarServicoComponent, {
        panelClass: 'cadastro-modal'
      });
  }


}
