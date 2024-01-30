import { Component, OnInit } from '@angular/core';
import {  Router, Params, ActivatedRoute } from '@angular/router';
import { Follow } from 'src/app/models/follow';
import { Publication } from 'src/app/models/publication';
import { User } from 'src/app/models/user';
import { FollowService } from 'src/app/service/follow.service';
import { GLOBAL } from 'src/app/service/global';
import { PublicationService } from 'src/app/service/publication.service';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService, UploadService, FollowService, PublicationService]
})

export class ProfileComponent implements OnInit {

  public title: string;
  public user: User;
  public users: any;
  public follows: any;
  public status: string;
  public identity : any;
  public token: string;
  public stats: any;
  public url: string;
  public follow: any;
  public following: boolean;
  public followed: boolean ;
  public users_follow_me : boolean;
  public followUserOver:any ;
  public _id: any;
  public publications: any;
  public total: any ;
  public pages: any;
  public itemsPerPage: any;
  public page: any;

  constructor(private us: UserService,
    private _route: ActivatedRoute,
    private up: UploadService,
    private fs:FollowService,
    private ps: PublicationService,
    private _router:Router,
    ) {

      this.title = 'Perfil';
      this.identity = this.us.getIdentity();
      this.token = this.us.getToken();
      this.url = GLOBAL.url ;
      this.following = false ;
      this.followed = false ;
      this.users_follow_me ;
   }

  ngOnInit(): void {
    this.loadPage();
  }



  loadPage(){
    this._route.params.subscribe(params => {
      let id = params['id'] ;
      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id:any){
    this.us.getUser(id).subscribe(

      response => {
        if(response.user){
          this.user = response.user ;

          if(response.following._id){
            this.following = true ;
          }else{
            this.following = false ;
          }

          if( response.followed && response.followed._id){
            this.followed = true ;
          }else{
            this.followed = false ;
          }

        }else{
          this.status = 'error';
        }

      },
      error => {
        console.log(<any>error);
        this._router.navigate(['/perfil', this.identity._id])
      }

    );
  }



  getCounters(id:any){
    this.us.getCounters(id).subscribe(
      response => {
        this.stats = response ;
      },
      error => {
        console.log(<any>error);
      }
  )}


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

      }

    )

  }

  followUser(followed:any){

    var follow = new Follow('', this.identity._id, followed);

    this.fs.addFollow(this.token, follow).subscribe(

        response => {

          this.following = true ;

        } ,

        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);


        }

  )}



}
