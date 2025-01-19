import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="profile-container">
      <h1>My Profile</h1>
      <p>This is your profile page. Add details here.</p>
    </div>
  `,
  styles: [
    `
      .profile-container {
        text-align: center;
        padding: 2rem;
      }
      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      p {
        font-size: 1.2rem;
        color: #ddd;
      }
    `,
  ],
})
export class ProfileComponent {}
