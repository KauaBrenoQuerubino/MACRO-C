import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';

import { AuthService } from '../../core/guard/auth/auth.service';
import { Usuario } from '../../model/User/usuario';


@Component({
  selector: 'app-index',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  constructor(private router: Router, private authService: AuthService){}


  ngOnInit() {
    this.PegarUsuario();


  }


  irPara(destino: string) {
    this.router.navigate([`/${destino}`])
  }

  usuarioAtual!: Usuario;


  PegarUsuario() {
    this.authService.sessao(this.authService.token).subscribe({
      next: res => {
        this.usuarioAtual = res;
        console.log(this.usuarioAtual)
      }
    })
  }


  

  

}
