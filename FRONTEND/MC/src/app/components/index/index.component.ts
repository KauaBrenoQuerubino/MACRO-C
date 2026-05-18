import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-index',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  constructor(router: Router){}
}
