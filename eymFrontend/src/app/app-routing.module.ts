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
import {ContactComponent} from './contact/contact.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/',
    pathMatch: 'full'
  },
  {
    path: '',
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
    path: 'contact',
    component: ContactComponent
    ,canActivate: [AuthGuard]
  },
  {
    path:'about-us',
    component: AboutComponent
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
