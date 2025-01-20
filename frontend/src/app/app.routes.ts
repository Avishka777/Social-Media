import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { PostListComponent } from './post-list/post-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { PostCreateComponent } from './post-create/post-create.component';

export const routes: Routes = [
  { path: 'profile', component: ProfileComponent }, 
  { path: '', component: PostListComponent, canActivate: [AuthGuard]  }, 
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-post', component: PostCreateComponent },
];
