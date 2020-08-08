import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData:any = {};

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res=>{console.log(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('currentUser', this.loginUserData.username)
        this._router.navigate(['/user-list'])
    },
      err=>console.log(err)
    )
  }

}