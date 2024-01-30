import { Component, OnInit } from '@angular/core';
import {  Router, Params, ActivatedRoute } from '@angular/router';
import { Follow } from 'src/app/models/follow';
import { User } from 'src/app/models/user';
import { FollowService } from 'src/app/service/follow.service';
import { GLOBAL } from 'src/app/service/global';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.component.html',
  styleUrls: ['./followed.component.scss'],
  providers: [UserService, UploadService, FollowService]
})

export class FollowedComponent implements OnInit {

  public title: string;
  public users: any;
  public user:any;
  public identity: any;
  public token:any ;
  public status: string;
  public url: string ;
  public page: any ;
  public next_page: any ;
  public prev_page: any ;
  public follows: any;
  public following: any;
  public followed: any;
  public total: any ;
  public pages : any ;
  public _id: any;
  public pageEvent: PageEvent;

  constructor(private us: UserService,
              private _route: ActivatedRoute,
              private up: UploadService,
              private fs:FollowService,
              private _router:Router,
              ) {

    this.title = 'Seguidores de' ;
    this.status = '' ;
    this.identity = this.users;
    this.identity = this.us.getIdentity();
    this.token = this.us.getToken();
    this.url = GLOBAL.url ;
  }

  ngOnInit(): void {
    console.log('hola el componente followed esta cargando bien...');
    this.actualPage();
  }

  actualPage(){
    this._route.params.subscribe( params => {

      let user_id = params['id'];

      let page = +params['page'] ;
      this.page = page ;

      if(!page){
        page = 1 ;
      }else{
        this.next_page = page+1;
        this.prev_page = page-1;
      }
      if(this.prev_page <= 0 ){
        this.prev_page = 1 ;
      }

      this.getUser(user_id, page);

    });
  }

  getFollows(user_id:any, page:any){
    this.fs.getFollowed(this.token, user_id, page).subscribe(

      response => {
        if(!response){
          this.status = 'error';
        }else{

          console.log(response)

            this.total = response.total ;
            this.followed = response.follows;
            this.pages = response.pages;
            this.follows  =response.users_following;

          if(page > this.pages){
            this._router.navigate(['/gente', 1]);
          }
        }
      },

      error => {
        console.log(error)
      });
  }

  getUser(user_id:any, page:any){
    this.us.getUser(user_id).subscribe(
      response => {
        if(response.user){
          this.user = response.user;
          this.getFollows(user_id, page);
        }else{
          this._router.navigate(['/home']);
        }
      },
      error => {
        console.log(<any>error);
      }
    )
  }

  public followUserOver:any ;

  mouseEnter(user_id:any){
    this.followUserOver = user_id;
  }

  mouseLeave(){
    this.followUserOver = 0;
  }

  unfollowUser(followed:any){

    this.fs.deleteFollow(this.token, followed).subscribe(

      response => {
          var search = this.follows.indexOf(followed);

          if(search != -1) {
            this.follows.splice(search, 1);
          }
      },
      error => {

        var errorMessage = <any>error;
        console.log(errorMessage);

      })
  }

  followUser(followed:any){

    var follow = new Follow('', this.users._id, followed);

    this.fs.addFollow(this.token, follow).subscribe(
        response => {
            console.log(response.follow)
            this.follows.push(follow);
        } ,
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
        }
    )}
}
