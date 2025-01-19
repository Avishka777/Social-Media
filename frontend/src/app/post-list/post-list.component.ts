import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    this.http.get('http://localhost:3000/posts').subscribe((data: any) => {
      this.posts = data;
    });
  }
}
