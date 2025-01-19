import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';  

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
  errorMessage: string = '';  // To hold the error message
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
        // Capture the error message from the response
        if (error?.error?.error) {
          this.errorMessage = error.error.error; 
        } else {
          this.errorMessage = 'Login failed. Please try again.';  
        }
        this.loading = false;
      }
    );
  }
}
