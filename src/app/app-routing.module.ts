import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowedComponent } from './components/followed/followed.component';
import { FollowingComponent } from './components/following/following.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { UserGuard } from './service/user.guard';

const routes: Routes = [
 {path:'home', component: HomeComponent, canActivate:[UserGuard]},
 {path:'login', component:LoginComponent},
 {path:'registro', component:RegisterComponent},
 {path:'mis-datos', component:UserEditComponent, canActivate:[UserGuard]},
 {path:'gente/:page', component:UsersComponent, canActivate:[UserGuard]},
 {path:'timeline', component:TimelineComponent, canActivate:[UserGuard]},
 {path:'perfil/:id', component:ProfileComponent, canActivate:[UserGuard]},
 {path:'siguiendo/:id/:page', component:FollowingComponent, canActivate:[UserGuard]},
 {path:'seguidores/:id/:page', component:FollowedComponent, canActivate:[UserGuard]},
 {path:'', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
