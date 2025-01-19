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
  template: `
    <div *ngIf="posts.length === 0">Loading posts...</div>
    <app-postcard *ngFor="let post of posts" [post]="post" (delete)="onDelete($event)" (update)="onUpdate($event)"></app-postcard>
  `,
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:3000/posts', { headers }).subscribe((data: any) => {
      this.posts = data.posts;
    });
  }

  // Delete post
  onDelete(postId: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(`http://localhost:3000/posts/${postId}`, { headers }).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }

  // Update post
  onUpdate(postId: number) {
    // You can implement a modal or other logic to update the post here
    console.log('Update post with id:', postId);
  }
}
