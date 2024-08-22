import { Component } from '@angular/core';
import { ChatService } from '../../services/chat-service/chat.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  title = this.chatService.getMessage();

  constructor(private chatService: ChatService){}

}
