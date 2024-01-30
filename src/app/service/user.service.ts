import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from '../models/follow';

import { User } from '../models/user';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public url:string ;
  public identity:any ;
  public token: any;
  public user: User[];
  public stats: any;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url ;
  }

  getCounters(userId:any = null):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());
        if(userId != null){
          return this._http.get(this.url+'counters/'+userId, {headers: headers})
        } else{
          return this._http.get(this.url+'counters', {headers:headers});
        }
  }

  getStats(){

  var stats =  JSON.parse(localStorage.getItem('stats')!);

    if(this.stats != 'undefined'){
      this.stats = stats ;
    }else{
      this.stats = null;
    }

    return this.stats ;

  }

  getIdentity(){

    let identity = JSON.parse(localStorage.getItem('identity')!) ;


    if(identity != "undefined"){
        this.identity = identity;
    }else{
      this.identity = null ;
    }

    return this.identity ;

  }

  getToken(){

    let token = JSON.parse(localStorage.getItem('token')!) ;

    if(token != "undefined"){
      this.token = token ;
    }else{
      this.token =  "undefined" ;
    }

    return this.token ;

  }

  updateUser(user: User):Observable<any>{

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.getToken());

    return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers})

  }

  getUsers(page:any):Observable<any>{


    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.getToken());

    return this._http.get(this.url+'users/'+page, {headers:headers})

  }

  getUser(id:any):Observable<any>{


    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.getToken());

    return this._http.get<User>(this.url+'user/'+id, {headers:headers})

  }

  register(user:User):Observable<any>{

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-type', 'application/json');

    return this._http.post<User>(this.url+'register', params, {headers:headers})

  }

  signup(user: any, gettoken: string | null | undefined): Observable<any> {
    if (gettoken != null) {

      user = Object.assign(user, {gettoken});
    }

    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post<User>(this.url + 'login', params, { headers: headers })
  }

}
