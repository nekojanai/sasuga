import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { RegistrationsDisabledGuard } from './guards/registrations-disabled.guard';
import { OnlyLoggedOutGuard } from './guards/only-logged-out.guard';
import { SettingsComponent } from '../settings/settings.component';
import { OnlyLoggedInGuard } from './guards/only-logged-in.guard';
import { UserComponent } from '../user/user.component';
import { FilesComponent } from '../files/files.component';

const routes: Routes = [
  {
    path: 'user/:name',
    component: UserComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegistrationsDisabledGuard, OnlyLoggedOutGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [OnlyLoggedOutGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [OnlyLoggedInGuard]
  },
  {
    path: 'files',
    component: FilesComponent,
    canActivate: [OnlyLoggedInGuard]
  },
  { path: 'home', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '404', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
