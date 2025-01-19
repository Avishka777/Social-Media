import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule

@Component({
  selector: 'app-postcard',
  standalone: true,
  imports: [CommonModule, FormsModule],  // <-- Add FormsModule here
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css'],
})
export class PostcardComponent {
  @Input() post: any; // Post data passed from parent
  comments: string[] = []; // List of comments
  newComment: string = ''; // Input for adding a comment
  showComments: boolean = false; // Toggle for showing comments
  likeCount: number = 0; // Count for likes

  constructor(private http: HttpClient) {}

  // Increment likes
  addLike() {
    this.likeCount++;
  }

  // Add a new comment
  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment.trim());
      this.newComment = ''; // Reset input
    }
  }

  // Toggle comments visibility
  toggleComments() {
    this.showComments = !this.showComments;
  }
}
