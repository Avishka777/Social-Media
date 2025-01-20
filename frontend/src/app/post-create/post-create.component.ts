import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  post = {
    title: '',
    location: '',
    image: null as File | null, 
  };

  constructor(private http: HttpClient, private router: Router) {}

  // Handle image file selection
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.post.image = file;
    }
  }

  // Handle form submission
  createPost() {
    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('location', this.post.location);

    if (this.post.image) {
      formData.append('image', this.post.image, this.post.image.name); 
    }

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .post('http://localhost:3000/posts/create', formData, { headers })
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            title: 'Success!',
            text: 'Post created successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text:
              err.error.message || 'An error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        },
      });
  }
}
