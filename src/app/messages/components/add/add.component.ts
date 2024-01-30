import { Component, OnInit, DoCheck } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Follow } from "src/app/models/follow";
import { Message } from "src/app/models/message";
import { MessagesService } from "src/app/service/messages.service";
import { FollowService } from "src/app/service/follow.service";
import { GLOBAL } from "src/app/service/global";
import { UserService } from "src/app/service/user.service";


@Component({
  selector: "add",
  templateUrl:'./add.component.html',
  providers: [FollowService, MessagesService,UserService]
})

export class AddComponent  implements OnInit {

  public title: string ;
  public message: any;
  public identity: any;
  public token: string;
  public url: string;
  public status: string ;
  public follow: any ;
  public follows: any ;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private fs: FollowService,
    private ms: MessagesService,
    private us: UserService,
    ){
    this.title = 'Enviar mensaje';
    this.identity = this.us.getIdentity();
    this.token = this.us.getToken();
    this.url = GLOBAL.url;
    this.message = new Message('','','','',this.identity._id,'')
  }

  ngOnInit(): void {
      this.getMyFollows();
      this.identity = this.us.getIdentity();

  }

  onSubmit(form:any): void{
    this.ms.addMessages(this.token, this.message).subscribe(
      response => {
        if(response.message){
          this.status = 'success';
          form.reset();
        }
      },
      error => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

  getMyFollows(){
    this.fs.getMyFollows(this.token).subscribe(

      response => {
        this.follows = response.follows;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
