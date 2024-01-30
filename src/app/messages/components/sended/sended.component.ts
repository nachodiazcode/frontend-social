import { Component, OnInit, DoCheck } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Follow } from "src/app/models/follow";
import { Message } from "src/app/models/message";
import { MessagesService } from "src/app/service/messages.service";
import { FollowService } from "src/app/service/follow.service";
import { GLOBAL } from "src/app/service/global";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "sended",
  templateUrl:'./sended.component.html',
  providers: [FollowService, MessagesService,UserService]
})

export class SendedComponent implements OnInit {

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
  public messages:any;
  public message: any ;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private fs: FollowService,
    private ms: MessagesService,
    private us: UserService,
    ){
    this.title = 'Mensajes Enviados';
    this.identity = this.us.getIdentity();
    this.token = this.us.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    console.log('sended.component cargado');
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

      this.getMessages(this.token, this.page);


    });
  }

  getMessages(token:any, page:any){

    this.ms.getEmitterMessages(token, page).subscribe(

      response=>{
        if(response.messages){
          this.messages = response.messages;
          console.log(response.messages)
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
