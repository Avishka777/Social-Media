import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  firstName: string | null = '';
  lastName: string | null = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in by checking the localStorage for token and user data
    const authToken = localStorage.getItem('authToken');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    
    if (authToken && firstName && lastName) {
      this.isLoggedIn = true;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }

  // Sign out the user
  signOut(): void {
    localStorage.clear(); 
    this.isLoggedIn = false;
    this.router.navigate(['/']); 
    window.location.reload();
  }
}
