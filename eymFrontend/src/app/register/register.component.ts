import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData: any = { };

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res=>{console.log(res)
          localStorage.setItem('token', res.token)
          localStorage.setItem('currentUser',  this.registerUserData.username)
          this._router.navigate(['/index'])
      },
      err=>console.log(err)
    )
  }
}
