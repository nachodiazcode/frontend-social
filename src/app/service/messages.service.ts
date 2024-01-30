import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {

  public url: string ;
  public token: string ;

  constructor(private _http: HttpClient) {
      this.url = GLOBAL.url ;
  }

  addMessages(token:string, message:any ):Observable<any>{

    let params = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization',this.getToken());

    return this._http.post(this.url+'message', params, {headers: headers});

  }

  getMessages(token:string, page: number = 1 ):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization',this.getToken());

    return this._http.get(this.url+'my-messages/'+page, {headers: headers});

  }

  getEmitterMessages(token:string, page: any = 1 ):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization',this.getToken());

    return this._http.get(this.url+'messages/'+page, {headers: headers});

  }

  getReceivedMessages(token:string, page: any = 1 ):Observable<any>{

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                   .set('Authorization',this.getToken());

    return this._http.get(this.url+'my-messages/'+page, {headers: headers});

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

}
