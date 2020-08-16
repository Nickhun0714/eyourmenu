import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements OnInit{
  registerUserData: any = { usnm: localStorage.getItem('currentUser')};

  constructor(private route: ActivatedRoute,private _router:Router, private _auth: AuthService) {}
  
  ngOnInit() {
    let emailToken:string = this._router.url;
    let emailTokenTmp = emailToken.substring(16);
    let currToken:string = localStorage.getItem('token');

    if(emailTokenTmp === currToken){
      this._auth.getTokenCompare(this.registerUserData)
      .subscribe(
        res=>{console.log(res)
            this._router.navigate(['/index']);
        },
        err=>console.log(err)
      )
      this._router.navigate(['/index']);
    }else{
      console.log("Your account hasn't been activated. Please contact us");
    }
  }

}
