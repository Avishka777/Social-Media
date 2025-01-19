import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostcardComponent } from '../postcard/postcard.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, PostcardComponent],
  template: `
    <div *ngIf="posts.length === 0">Loading posts...</div>
    <app-postcard
      *ngFor="let post of posts"
      [post]="post"
      (delete)="onDelete($event)"
      (update)="onUpdate($event)"
    ></app-postcard>

    <!-- Update Modal -->
    <div
      *ngIf="isEditing"
      class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
    >
      <div class="bg-white p-4 rounded-lg w-96 shadow-lg">
        <h3 class="text-lg font-semibold mb-4">Update Post</h3>
        <label class="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          [(ngModel)]="updatedTitle"
          class="w-full p-2 border rounded-md mb-4"
        />
        <label class="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          [(ngModel)]="updatedLocation"
          class="w-full p-2 border rounded-md mb-4"
        />
        <div class="flex justify-end">
          <button
            class="px-4 py-2 bg-gray-300 rounded-md mr-2"
            (click)="closeModal()"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md"
            (click)="saveUpdate()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  isEditing = false;
  currentPostId: number | null = null;
  updatedTitle: string = '';
  updatedLocation: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<any>('http://localhost:3000/posts', { headers })
      .subscribe((data: any) => {
        this.posts = data.posts;
      });
  }

  // Delete post
  onDelete(postId: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

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
        this.http
          .delete(`http://localhost:3000/posts/${postId}`, { headers })
          .subscribe(() => {
            this.posts = this.posts.filter((post) => post.id !== postId);
            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
          });
      }
    });
  }

  // Open modal for updating post
  onUpdate(post: any) {
    this.isEditing = true;
    this.currentPostId = post.id;
    this.updatedTitle = post.title;
    this.updatedLocation = post.location;
  }

  // Close the update modal
  closeModal() {
    this.isEditing = false;
    this.currentPostId = null;
    this.updatedTitle = '';
    this.updatedLocation = '';
  }

  // Save updated post
  saveUpdate() {
    if (this.currentPostId) {
      const token = localStorage.getItem('authToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const updatedData = {
        title: this.updatedTitle,
        location: this.updatedLocation,
      };

      this.http
        .put(
          `http://localhost:3000/posts/${this.currentPostId}`,
          updatedData,
          { headers }
        )
        .subscribe(
          (updatedPost: any) => {
            // Update the post in the list
            this.posts = this.posts.map((post) =>
              post.id === this.currentPostId ? { ...post, ...updatedPost } : post
            );
            Swal.fire('Updated!', 'Your post has been updated.', 'success');
            this.closeModal();
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Failed to update the post. Please try again later.',
              'error'
            );
          }
        );
    }
  }
}
