import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from 'src/app/service/global';

//modelo
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {

  public user: User ;
  public status: string ;
  public identity: any;
  public token :any;
  public stats: any;
  public url: string ;
  public follows:any ;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.user = new User("","","","","","","ROLE_USER","", "");
    this.status = '';
    this.url = GLOBAL.url ;

  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }

  onSubmit() {
    //LOGUEAR AL USUARIO Y CONSEGUIR SUS DATOS
    this._userService.signup(this.user, null).subscribe(
      response => {
        this.identity = response.user;
        if (!this.identity || !this.identity._id) {
          this.status = 'error';
        } else {
          localStorage.setItem('identity', JSON.stringify(this.identity));
          this.getToken();
          this.getCounters();

          this._router.navigate(['/']);

        }
      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )

  }

  getCounters(){

    this._userService.getCounters().subscribe(

      response => {
        localStorage.setItem('stats', JSON.stringify(response));
        this.stats = 'success';
        console.log(response);


        },
      error => {

      }

    )

  }

  getToken() {
    this._userService.signup(this.user, 'true').subscribe(
      response => {
        this.token = response.token;
        if (this.token.length <= 0) {
          this.status = 'error';
        } else {
          // PERSISTIR TOKEN DEL USUARIO
          localStorage.setItem('token', JSON.stringify(this.token));

          //Conseguir los contadores o estadisticas del usuario

          this.getCounters();
          console.log(response)

        }

      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

}
