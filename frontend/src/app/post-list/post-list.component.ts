import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // <-- Import HttpClientModule
import { PostcardComponent } from '../postcard/postcard.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, PostcardComponent], // <-- Add HttpClientModule here
  template: `
    <div *ngIf="posts.length === 0">Loading posts...</div>
    <app-postcard *ngFor="let post of posts" [post]="post"></app-postcard>
  `,
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    
    // Prepare headers with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Send the GET request with the token in the headers
    this.http.get<any>('http://localhost:3000/posts', { headers }).subscribe((data: any) => {
      // Access the 'posts' array from the response object
      this.posts = data.posts; // Assuming the response has the key 'posts' that holds the array
    });
  }
}
