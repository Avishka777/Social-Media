import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>This is the landing page of your application.</p>
    </div>
  `,
  styles: [
    `
      .home-container {
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
export class HomeComponent {}
