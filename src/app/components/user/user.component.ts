import { Component, OnInit } from '@angular/core';
import {  Router, Params, ActivatedRoute } from '@angular/router';
import { Follow } from 'src/app/models/follow';
import { User } from 'src/app/models/user';
import { FollowService } from 'src/app/service/follow.service';
import { GLOBAL } from 'src/app/service/global';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService, UploadService, FollowService]

})
export class UserComponent implements OnInit {

  public title: string;
  public users: any;
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

  constructor(private us: UserService,
              private _route: ActivatedRoute,
              private up: UploadService,
              private fs:FollowService,
              private _router:Router,
              ) {

    this.title = 'Gente' ;
    this.status = '' ;
    this.identity = this.users;
    this.token = this.us.getToken();
    this.url = GLOBAL.url ;
  }

  ngOnInit(): void {
    this.actualPage();
  }

  actualPage(){
    this._route.params.subscribe( params => {

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

      this.getUsers(page);

    });
  }

  getUsers(page:any){
    this.us.getUsers(page).subscribe(

      response => {
        if(!response.users){
          this.status = 'error';
        }else{

          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.following;
          this.followed = response.followed;

          if(page > this.pages){
            this._router.navigate(['/gente',1]);
          }


        }
      },

      error => {
        console.log(error)
      }

    )

  }

  public followUserOver:any ;

  mouseEnter(user_id:any){
    this.followUserOver = user_id;
  }

  mouseLeave(user_id:any){
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

      }

    )

  }

  followUser(followed:any){

    var follow = new Follow('', this.users._id, followed);

    this.fs.addFollow(this.token, follow).subscribe(

        response => {

          if(!response.follow){
            console.log(response.follow)
            this.status = 'success';
          }else{
            this.status = 'success';
            this.follows.push(follow);
          }

        } ,

        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);


        }

    )

  }

}
