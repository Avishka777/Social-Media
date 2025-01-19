import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for *ngIf and *ngFor
import { DatePipe } from '@angular/common'; // Import DatePipe to use the 'date' pipe

@Component({
  selector: 'app-postcard',
  standalone: true,
  imports: [CommonModule],  // Add CommonModule here
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css'],
})
export class PostcardComponent {
  @Input() post: any;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<number>();
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  onDelete(postId: number) {
    this.delete.emit(postId);
  }

  onUpdate(postId: number) {
    this.update.emit(postId);
  }
}
