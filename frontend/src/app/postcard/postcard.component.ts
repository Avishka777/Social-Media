import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';
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

  commentsVisible = false;
  isEditing = false;
  updatedTitle: string = '';
  updatedLocation: string = '';
  private socket: Socket;

  constructor(private http: HttpClient) {
    // Initialize socket connection
    this.socket = io('http://localhost:3000');

    // Listen for real-time updates
    this.socket.on('postUpdated', (updatedPost: any) => {
      if (this.post.id === updatedPost.id) {
        this.post = { ...this.post, ...updatedPost }; // Update post data
      }
    });

    // Listen for real-time deletions
    this.socket.on('postDeleted', (data: any) => {
      if (this.post.id === data.id) {
        Swal.fire('Deleted!', 'This post has been deleted.', 'info');
        this.post = null; // Handle removal locally (or notify parent component)
      }
    });
  }

  // Toggle comment section visibility
  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
  }

  // Like the post
  likePost() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post(`http://localhost:3000/like/${this.post.id}`, {}, { headers })
      .subscribe(
        (response: any) => {
          this.post.likeCount += response.message === 'Post liked' ? 1 : -1;
        },
        (error) => {
          console.error('Error liking the post:', error);
        }
      );
  }

  // Delete the post
  deletePost() {
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
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

        this.http.delete(`http://localhost:3000/posts/${this.post.id}`, { headers }).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
          },
          (error) => {
            Swal.fire('Error!', 'Failed to delete the post.', 'error');
            console.error('Error deleting the post:', error);
          }
        );
      }
    });
  }

  // Open the update modal
  openUpdateModal() {
    this.isEditing = true;
    this.updatedTitle = this.post.title;
    this.updatedLocation = this.post.location;
  }

  // Close the update modal
  closeUpdateModal() {
    this.isEditing = false;
    this.updatedTitle = '';
    this.updatedLocation = '';
  }

  // Save the updated post
  saveUpdate() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const updatedData = {
      title: this.updatedTitle,
      location: this.updatedLocation,
    };

    this.http.put(`http://localhost:3000/posts/${this.post.id}`, updatedData, { headers }).subscribe(
      (updatedPost: any) => {
        Swal.fire('Updated!', 'Your post has been updated.', 'success');
        this.post = { ...this.post, ...updatedPost }; // Update post locally
        this.closeUpdateModal();
      },
      (error) => {
        Swal.fire('Error!', 'Failed to update the post.', 'error');
        console.error('Error updating the post:', error);
      }
    );
  }
}
