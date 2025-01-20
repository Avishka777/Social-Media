import { Component, Input, OnInit } from '@angular/core';
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
export class PostcardComponent implements OnInit {
  @Input() post: any;

  commentsVisible = false;
  isEditing = false;
  updatedTitle: string = '';
  updatedLocation: string = '';
  private socket: Socket;
  isOwner: boolean = false; // Variable to track if the user is the owner of the post

  constructor(private http: HttpClient) {
    // Initialize socket connection
    this.socket = io('http://localhost:3000');
  }

  ngOnInit(): void {
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

    // Check if the logged-in user is the owner of the post
    this.checkOwnership();
  }

  checkOwnership() {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');

    if (storedFirstName && storedLastName) {
      // Compare post owner name with logged-in user's name
      this.isOwner =
        this.post.User.firstName === storedFirstName &&
        this.post.User.lastName === storedLastName;
    }
  }

  // Toggle comment section visibility
  toggleComments() {
    this.commentsVisible = !this.commentsVisible;
  }

  // Like the post
  likePost() {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No authentication token found');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const apiUrl = `http://localhost:3000/like/${this.post.id}`;

    // Optimistic UI update
    const originalLikeStatus = this.post.userHasLiked;
    const originalLikeCount = this.post.likeCount;

    // Update UI immediately
    this.post.userHasLiked = !originalLikeStatus;
    this.post.likeCount += this.post.userHasLiked ? 1 : -1;

    // Send API request
    this.http.post(apiUrl, {}, { headers }).subscribe(
      (response: any) => {
        if (response.message === 'Post liked') {
          this.post.userHasLiked = true;
        } else if (response.message === 'Post unliked') {
          this.post.userHasLiked = false;
        } else {
          console.warn('Unexpected response:', response);
        }
      },
      (error) => {
        console.error('Error liking the post:', error);

        // Revert UI changes on error
        this.post.userHasLiked = originalLikeStatus;
        this.post.likeCount = originalLikeCount;
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
        const headers = new HttpHeaders().set(
          'Authorization',
          `Bearer ${token}`
        );

        this.http
          .delete(`http://localhost:3000/posts/${this.post.id}`, { headers })
          .subscribe(
            () => {
              Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
              this.socket.emit('postDeleted', { id: this.post.id }); // Emit delete event for real-time updates
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

    this.http
      .put(`http://localhost:3000/posts/${this.post.id}`, updatedData, {
        headers,
      })
      .subscribe(
        (updatedPost: any) => {
          Swal.fire('Updated!', 'Your post has been updated.', 'success');
          this.post = { ...this.post, ...updatedPost }; // Update post locally
          this.socket.emit('postUpdated', updatedPost); // Emit real-time update
          this.closeUpdateModal();
        },
        (error) => {
          Swal.fire('Error!', 'Failed to update the post.', 'error');
          console.error('Error updating the post:', error);
        }
      );
  }
}
