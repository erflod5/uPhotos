import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { SigninComponent } from './signin/signin.component';
import { MeComponent } from './me/me.component';
import { AlbumComponent } from './album/album.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'user', component: UserComponent, canActivate : [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'me', component: MeComponent, canActivate : [AuthGuard]},
  { path: 'album', component: AlbumComponent,canActivate : [AuthGuard]},
  { path : '**', component : UserComponent,canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
