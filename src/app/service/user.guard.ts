import { Injectable } from "@angular/core";
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()

export class UserGuard implements CanActivate{

  constructor(
    private _router: Router,
    private us: UserService
  ){}

  canActivate(){
    let identity = this.us.getIdentity();

    if(identity && (identity.role == 'ROLE_USER' || identity.role ==  'ROLE_ADMIN')){
      return true ;
    }else{
      this._router.navigate(['/login']);
      return false ;
    }
  }

}
