import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})

export class HomeComponent implements OnInit {

  public title: string ;
  public identity:any ;

  constructor(
    private _userService: UserService
    ) {
    this.title = "Bienvenido a Pepole";
    this.identity = "";
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
  }

}
