import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from './auth.guard';
import { UserListService } from './user-list.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IndexComponent } from './index/index.component';
import { ConfirmedComponent } from './shared/confirmed/confirmed.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
    ,canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'auth/confirmed/:emailToken',
    component: ConfirmedComponent
  },
  {
    path:'**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
