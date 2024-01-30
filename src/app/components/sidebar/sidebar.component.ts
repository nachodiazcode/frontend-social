import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication';
import { FollowService } from 'src/app/service/follow.service';
import { GLOBAL } from 'src/app/service/global';
import { PublicationService } from 'src/app/service/publication.service';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [UserService, UploadService, FollowService, PublicationService]
})

export class SidebarComponent implements OnInit {

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
  public stats: any ;
  public publication: Publication;

  constructor(private us: UserService,
              private up: UploadService,
              private fs:FollowService,
              private ps:PublicationService,
              private _route: ActivatedRoute,
              private _router:Router
              ) {

    this.title = 'Sidebar' ;
    this.status = '' ;
    this.identity = this.users;
    this.token = this.us.getToken();
    this.url = GLOBAL.url ;
    this.publication = new Publication("", "", "","", "");
  }

  DoCheck(): void {
    this.identity = this.us.getIdentity();
    this.token = this.us.getToken();
    this.stats = this.us.getStats();
    console.log(this.identity);
  }

  ngOnInit(): void {
    this.identity = this.us.getIdentity();
    this.token = this.us.getToken();
    this.stats = this.us.getStats();
  }

  public fileToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
    this.fileToUpload = <Array<File>>fileInput.target.files ;
  }

  onSubmit(form:any){
    this.ps.addPublication(this.publication).subscribe(
        response => {
          if(response.publication){

            //Subir Imagen

            if(this.fileToUpload && this.fileToUpload.length ){
              this.up.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id, [], this.fileToUpload, this.token, 'image')
              .then((result:any) => {
                this.publication.file = result.image ;
                this.status = 'success';
                form.reset();
                this._router.navigate(['./timeline']);
              });
            }else{
             form.reset();
             this._router.navigate(['/timeline'])
            }


          }else{
            this.status = 'error';
          }
        },
        error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage != null){
            this.status = 'error';
          }
        }
    )}

  //Output
  @Output() sended = new EventEmitter();
  sendPublication(event:any){
    console.log(event);
    this.sended.emit({send:'true'})
  }

}
