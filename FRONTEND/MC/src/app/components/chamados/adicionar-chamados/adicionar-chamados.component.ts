import { Component } from '@angular/core';
import { Chamado } from '../../../model/chamados/chamado';
import { FormsModule } from '@angular/forms';
import { ChamadosService } from '../../../core/service/chamados/chamados.service';
import { AuthService } from '../../../core/guard/auth/auth.service';
import { NotificationService } from '../../../until/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adicionar-chamados',
  imports: [FormsModule],
  templateUrl: './adicionar-chamados.component.html',
  styleUrl: './adicionar-chamados.component.scss'
})
export class AdicionarChamadosComponent {


  constructor(
    private chamadoService: ChamadosService, 
    private authService: AuthService, 
    private router: Router, 
    private notify: NotificationService) {
    this.chamado.usuarioId = this.authService.id || '';
  }


  chamado: Chamado = {
    id: '',
    titulo: '',
    descricao: '',
    prioridade: 'BAIXA',
    status: 'ABERTO',
    usuarioId: '',
    responsavelId: '',
    categoria: 'BUG',
    prazo: new Date(),
    atrasado: false,
    comentarios: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };


  cadastrarChamado() {

    if(
      this.chamado.titulo == '' || 
      this.chamado.descricao == '' || 
      this.chamado.prazo == null)
      {
        this.notify.error('Todos os campos precisam estar preenchidos!');
        return;
      }

    
    this.chamadoService.save(this.chamado).subscribe({
      next: res => {
        this.notify.success('Chamado cadastrado com sucesso!');
        this.router.navigate(['/chamados']);
      },
      error: err => {
        this.notify.error(err.error.message);
      }
    });
  }


}
