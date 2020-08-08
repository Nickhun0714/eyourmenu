import { Component, OnInit } from '@angular/core';
import { UserListService } from '../user-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:any = [];
  constructor(private _userListService: UserListService,
    private _router:Router) { }

  ngOnInit(): void {
    
    this._userListService.getAll()
    .subscribe(
      res=>this.users = res,
      err=>{
        if(err instanceof HttpErrorResponse){
          if(err.status ===401){
          this._router.navigate(['/login']);
          }
        }
      }
    )
  }

}
