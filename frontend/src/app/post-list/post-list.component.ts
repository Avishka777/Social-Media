import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostcardComponent } from '../postcard/postcard.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, PostcardComponent],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = []; // Holds all posts fetched from the backend
  isEditing: boolean = false; // Tracks if a post is in editing mode
  currentPostId: number | null = null; // Tracks the ID of the post being edited
  updatedTitle: string = ''; // Holds the updated title during edit
  updatedLocation: string = ''; // Holds the updated location during edit

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  // Fetch posts from the backend
  fetchPosts(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<{ posts: any[] }>('http://localhost:3000/posts', { headers })
      .subscribe({
        next: (data) => {
          this.posts = data.posts;
        },
        error: (err) => {
          console.error('Error fetching posts:', err);
        },
      });
  }

  // Enable editing mode for a specific post
  enableEditing(post: any): void {
    this.isEditing = true;
    this.currentPostId = post.id;
    this.updatedTitle = post.title;
    this.updatedLocation = post.location;
  }

  // Cancel editing mode
  cancelEditing(): void {
    this.isEditing = false;
    this.currentPostId = null;
    this.updatedTitle = '';
    this.updatedLocation = '';
  }

  // Save updates to the backend
  saveUpdate(): void {
    if (!this.currentPostId) return;

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const updatedPost = {
      title: this.updatedTitle,
      location: this.updatedLocation,
    };

    this.http
      .put(`http://localhost:3000/posts/${this.currentPostId}`, updatedPost, {
        headers,
      })
      .subscribe({
        next: () => {
          // Update the local posts array with the new data
          const index = this.posts.findIndex(
            (post) => post.id === this.currentPostId
          );
          if (index !== -1) {
            this.posts[index] = {
              ...this.posts[index],
              title: this.updatedTitle,
              location: this.updatedLocation,
            };
          }
          this.cancelEditing(); // Exit editing mode
        },
        error: (err) => {
          console.error('Error updating the post:', err);
        },
      });
  }

  // Delete a post
  deletePost(postId: number): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .delete(`http://localhost:3000/posts/${postId}`, { headers })
      .subscribe({
        next: () => {
          // Remove the deleted post from the local posts array
          this.posts = this.posts.filter((post) => post.id !== postId);
        },
        error: (err) => {
          console.error('Error deleting the post:', err);
        },
      });
  }
}
