import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileSetupComponent } from './features/setup/profile-setup/profile-setup.component';
import { GoalsComponent } from './features/setup/goals/goals.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ChatComponent } from './features/chat/chat.component';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'setup', component: ProfileSetupComponent },
  { path: 'goals', component: GoalsComponent },
  {
    path: '', 
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: '**', redirectTo: 'auth/login' }
];
