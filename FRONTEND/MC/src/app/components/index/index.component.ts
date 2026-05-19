import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-index',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  constructor(private router: Router){}

    irPara(destino: string) {
    this.router.navigate([`/${destino}`])
  }

  

}
