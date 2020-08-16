import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()/*{
 // providedIn: 'root'
})*/
export class AuthService {
  private _registerUrl = "http://localhost:3010/api/register";
  private _loginUrl = "http://localhost:3010/api/login";
  private _tokenCompareUrl = "http://localhost:3010/api/tokenCompare"
  constructor(private http: HttpClient,
    private _router: Router) { }

    registerUser(user){
      return this.http.post<any>(this._registerUrl, user);
    }

    loginUser(user){
      return this.http.post<any>(this._loginUrl, user);
    }

    loggedIn(){
      //console.log(localStorage.getItem('token'));
      return !!localStorage.getItem('token');

    }
    
    logoutUser(){
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this._router.navigate(['/user-list']);
    }

    getUsername(){
      return localStorage.getItem('currentUser');
    }

    getToken(){
      return localStorage.getItem('token');
    }

    getTokenCompare(usnm){

      return this.http.post<any>(this._tokenCompareUrl, usnm);
    }
  
}
