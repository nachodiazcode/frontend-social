import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { GLOBAL } from 'src/app/service/global';
import { UploadService } from 'src/app/service/upload.service';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [UserService, UploadService]
})
export class UserEditComponent implements OnInit {

  public title: string;
  public user: any;
  public identity: any;
  public token:any ;
  public status: string;
  public url: string ;

  constructor(private us: UserService,
              private up: UploadService,
              private _router:Router
              ) {

    this.title = 'Actualizar Mis Datos' ;
    this.status = '' ;
    this.user = this.us.getIdentity();
    this.identity = this.user;
    this.token = this.us.getToken();
    this.url = GLOBAL.url ;
  }

  ngOnInit(): void {
  }

  public filesToUpload!: Array<File>;

  fileChangeEvent(fileInput: any){

    this.filesToUpload = <Array<File>>fileInput.target.files ;
    console.log(this.filesToUpload) ;

  }

  onSubmit(): void {

    console.log(this.user);
    this.us.updateUser(this.user).subscribe(

      response => {

        if(!response.user){
          this.status = 'error'
        }else{
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user ;

          this.up.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
                .then((result: any)=>{
                  console.log(result);
                  this.user.image = result.user.image ;
                  localStorage.setItem('identity', JSON.stringify(this.user));
                });


        }

      },
      error => {
        console.log(error)
      }


    )

  }

}
