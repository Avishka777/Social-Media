import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  birthday: string = '';
  loading: boolean = false;
  errorMessage: string = '';
  showPassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  // Function to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Register form submission handler
  onSubmit() {
    this.loading = true;
    const registerData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      birthday: this.birthday,
    };

    this.http
      .post('http://localhost:3000/users/register', registerData)
      .subscribe(
        (response: any) => {
          Swal.fire({
            title: 'Success!',
            text: 'User registered successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          this.loading = false;
          const errorMessage =
            error.error.details || 'An error occurred during registration.';
          Swal.fire({
            title: 'Error!',
            text: errorMessage,
            icon: 'error',
            confirmButtonText: 'Try Again',
          });
        }
      );
  }
}
