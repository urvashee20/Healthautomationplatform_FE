import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages = signal<string[]>([]);
  currentMessage = '';

  setSuggestion(msg: string) {
    this.currentMessage = msg;
  }

  sendMessage(event: Event) {
    event.preventDefault();
    if (this.currentMessage.trim()) {
      this.messages.update(m => [...m, this.currentMessage]);
      this.currentMessage = '';
    }
  }
}
