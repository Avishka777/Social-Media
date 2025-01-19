import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';

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
  private socket: Socket;

  constructor(private http: HttpClient) {
    // Initialize socket connection
    this.socket = io('http://localhost:3000');

    // Listen for real-time updates
    this.socket.on('postUpdated', (updatedPost: any) => {
      if (this.post.id === updatedPost.id) {
        this.post.likeCount = updatedPost.likeCount;
      }
    });
  }

  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
  }

  likePost() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post(`http://localhost:3000/like/${this.post.id}`, {}, { headers })
      .subscribe(
        (response: any) => {
          // Update the like count locally
          this.post.likeCount += response.message === 'Post liked' ? 1 : -1;
        },
        (error) => {
          console.error('Error liking the post:', error);
        }
      );
  }
}
