import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//modelo
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public user: User ;
  public status: string ;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User("","","","","","","ROLE_USER","", "");
    this.status = '' ;
  }

  ngOnInit(): void {
  }

  onSubmit(form:any){
    this._userService.register(this.user).subscribe(

      response => {
        if(response.user && response.user._id){
          console.log(response.user)
          this.status = 'success';
          form.reset();
        }else{
          this.status = 'error'
        }
      },
      error => {
        console.log(<any>error);
      }

    ) ;
  }

}
