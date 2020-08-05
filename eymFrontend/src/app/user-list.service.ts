import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
// @Injectable({
//   providedIn: 'root'
// })
@Injectable()

export class UserListService {
    
  private _userUrl = "http://localhost:3010/api/getAll";

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<any>(this._userUrl);
  }
}
