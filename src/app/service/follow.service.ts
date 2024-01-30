import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Follow } from '../models/follow';

import { User } from '../models/user';
import { GLOBAL } from './global';


@Injectable({
  providedIn: 'root'
})
export class FollowService {

  public url:string ;
  public identity:any ;
  public token: any;
  public user: User[];
  public stats: any;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url ;
  }

  getFollowing(token:any, userId:any = null, page = 1):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());


    var url = this.url+'following' ;
    if(userId != null){
      url = this.url+'following/'+userId+'/'+page ;
    }

    return this._http.get(url, {headers:headers});

  }

  getFollowed(token:any, userId:any = null, page = 1):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());

    var url = this.url+'followed' ;
    if(userId != null){
      url = this.url+'followed/'+userId+'/'+page ;
    }

    return this._http.get(url, {headers:headers});

  }

  addFollow(token:any, follow:Follow):Observable<any>{

    let params = JSON.stringify(follow);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());

    return this._http.post(this.url+'follow', params, {headers:headers});

  }

  deleteFollow(token:any, id:any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization', this.getToken());

    return this._http.delete(this.url+'follow/'+id, {headers:headers});

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
      this.token = null ;
    }

    return this.token ;

  }

  getMyFollows(token:any):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', ' application/json')
                                   .set('Authorization', this.getToken())

    return this._http.get(this.url+'get-my-follows/'+true, {headers:headers});

  }



}
