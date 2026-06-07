import { Component } from '@angular/core';
import { ConversasComponent } from "./conversas/conversas.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat',
  imports: [ConversasComponent, RouterLink],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

}
