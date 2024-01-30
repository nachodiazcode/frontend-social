import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})

export class PublicationService {

  public url: string ;
  public token: string ;

  constructor(private _http: HttpClient) {
      this.url = GLOBAL.url ;
  }

  addPublication( publication: Publication):Observable<any>{

    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.getToken()) ;

    return this._http.post<Publication>(this.url+'publication', params, {headers:headers})

  }

  getPublications(token:string, page: any = 1 ):Observable<any>{

    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.getToken()) ;

    return this._http.get<Publication>(this.url+'publications/'+page, {headers:headers})

  }

  getPublicationsUser(  token:string, user:any, page: any = 1 ):Observable<any>{

    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization', this.getToken()) ;

    return this._http.get<Publication>(this.url+'publications-user/'+user+'/'+page, {headers:headers})

  }

  deletePublications(token:string, id:any ):Observable<any>{

    let headers = new HttpHeaders().set('Content-type', 'application/json')
                                   .set('Authorization',token) ;

    return this._http.delete<Publication>(this.url+'publication/'+id, {headers:headers})

  }

  getToken(){

    let token = JSON.parse(localStorage.getItem('token')!) ;

    if(token != "undefined"){
      this.token = token ;
    }else{
      this.token =  "undefined" ;
    }

    return this.token ;

  }}
