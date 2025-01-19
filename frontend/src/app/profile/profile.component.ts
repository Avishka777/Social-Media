import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  birthday: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchUserProfile();
  }

  // Fetch user profile
  fetchUserProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      Swal.fire('Error', 'You must be logged in to access this page', 'error');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get('http://localhost:3000/users/profile', { headers }).subscribe(
      (response: any) => {
        const { firstName, lastName, email, birthday } = response.user;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthday = birthday;
      },
      (error) => {
        Swal.fire('Error', 'Failed to fetch profile data', 'error');
      }
    );
  }

  // Update profile
  updateProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      Swal.fire(
        'Error',
        'You must be logged in to update your profile',
        'error'
      );
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const updatedData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthday: this.birthday,
      password: this.password,
    };

    this.http
      .put('http://localhost:3000/users/update', updatedData, { headers })
      .subscribe(
        () => {
          Swal.fire('Success', 'Profile updated successfully', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Failed to update profile', 'error');
        }
      );
  }

  // Delete profile
  deleteProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      Swal.fire(
        'Error',
        'You must be logged in to delete your profile',
        'error'
      );
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete('http://localhost:3000/users/delete', { headers })
          .subscribe(
            () => {
              Swal.fire('Deleted', 'Your profile has been deleted', 'success');
              localStorage.removeItem('authToken');
              this.router.navigate(['/register']);
            },
            (error) => {
              Swal.fire('Error', 'Failed to delete profile', 'error');
            }
          );
      }
    });
  }
}
