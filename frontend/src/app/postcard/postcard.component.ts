import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For ngModel
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postcard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css'],
})
export class PostcardComponent {
  @Input() post: any;
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<any>();

  menuOpen = false;
  commentsVisible = false;
  isEditing = false;

  updatedTitle = '';
  updatedLocation = '';

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
  }

  onUpdate(postId: number) {
    this.isEditing = true;
    this.updatedTitle = this.post.title;
    this.updatedLocation = this.post.location;
  }

  saveUpdate() {
    if (this.updatedTitle && this.updatedLocation) {
      const updatedPost = {
        ...this.post,
        title: this.updatedTitle,
        location: this.updatedLocation,
      };
      this.update.emit(updatedPost);
      this.isEditing = false;
    } else {
      Swal.fire('Error', 'Both fields must be filled!', 'error');
    }
  }

  onDelete(postId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete.emit(postId);
        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
      } else {
        Swal.fire('Cancelled', 'Your post is safe!', 'info');
      }
    });
  }

  closeModal() {
    this.isEditing = false;
  }
}
