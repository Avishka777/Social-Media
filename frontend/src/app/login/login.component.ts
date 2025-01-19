import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:3000/users/login', credentials).subscribe(
      (response: any) => {
        if (response.token) {
          // Store token in localStorage
          localStorage.setItem('authToken', response.token);
          
          // Navigate to home page after successful login
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    );
  }
}
