import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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
  loading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Login form submission handler
  onSubmit() {
    this.loading = true;
    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:3000/users/login', loginData).subscribe(
      (response: any) => {
        // If token is received, store it in localStorage
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/']);
        }
        this.loading = false;
      },
      (error) => {
        let errorMessage = 'Login failed. Please try again.';
        if (error?.error?.error) {
          errorMessage = error.error.error; 
        }

        Swal.fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });

        this.loading = false;
      }
    );
  }
}
