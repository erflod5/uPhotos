import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router : Router, private apiService : ApiService){}

  canActivate(){
    let usr : any = this.apiService.getCurrentUser();
    if(usr == false){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
