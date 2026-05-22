import { Component } from '@angular/core';
import { ConversasComponent } from "./conversas/conversas.component";

@Component({
  selector: 'app-chat',
  imports: [ConversasComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

}
