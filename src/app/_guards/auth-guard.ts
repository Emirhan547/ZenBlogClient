import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private autherService:AuthService,
             private router:Router
  ) {


  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult>
  {
    if(this.autherService.loggedIn())
    {
      return true;
    }
    console.log("auth guard");
    this.router.navigate([""])
    return false;
  }


  }

