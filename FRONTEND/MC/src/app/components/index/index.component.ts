import { Component } from '@angular/core';

import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { AuthService } from '../../core/guard/auth/auth.service';
import { Usuario } from '../../model/User/usuario';
import { ConversaService } from '../../core/service/conversa/conversa.service';

import { TrocarASenhaComponent } from '../usuarios/modal/trocar-a-senha/trocar-a-senha.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  imports: [RouterOutlet, RouterLinkWithHref, MatButtonModule, MatBadgeModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private conversaService: ConversaService,
    private dialog: MatDialog){
      this.userRole = authService.getUserRule()
    }
  
  conversas = []

  configMode = false

  ngOnInit() {

    this.PegarUsuario();

    setInterval(() => {
      this.carregarConversas()
    }, 10000)

    

  }

  carregarConversas() {
    this.conversaService.listarMensagensNaoLidas(this.usuarioAtual.id).subscribe({
      next: res => {
        this.conversas = res
      }
    })
  }

  irPara(destino: string) {
    this.router.navigate([`/${destino}`])
  }

  userRole!: string | null;
  usuarioAtual!: Usuario;


  PegarUsuario() {
    this.authService.sessao(this.authService.token).subscribe({
      next: res => {
        this.usuarioAtual = res;
        this.carregarConversas()
      }
    })
  }

  alterarSenha(){
    this.dialog.open(TrocarASenhaComponent, {
      panelClass: "alterar-senha"
    });
  
  }

  sair() {
    this.authService.logout()
  }


  

  

}
