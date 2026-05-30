import { Component } from '@angular/core';
import { Chamado } from '../../../model/chamados/chamado';
import { FormsModule } from '@angular/forms';
import { ChamadosService } from '../../../core/service/chamados/chamados.service';
import { AuthService } from '../../../core/guard/auth/auth.service';

@Component({
  selector: 'app-adicionar-chamados',
  imports: [FormsModule],
  templateUrl: './adicionar-chamados.component.html',
  styleUrl: './adicionar-chamados.component.scss'
})
export class AdicionarChamadosComponent {


  constructor(private chamadoService: ChamadosService, private authService: AuthService) {
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
    this.chamadoService.save(this.chamado).subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
