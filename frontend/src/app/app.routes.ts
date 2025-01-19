import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostListComponent } from './post-list/post-list.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent }, 
  { path: '', component: PostListComponent }, 
];
