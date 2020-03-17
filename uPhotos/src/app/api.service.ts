import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs/internal/Observable'
import { ToastrService, Toast } from 'ngx-toastr';
import { isNullOrUndefined } from 'util'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers:HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  ip : string = 'http://localhost:3000/api';
  
  constructor(private http : HttpClient, private toastr : ToastrService) { }

  //http://localhost:3000/api/upload
  //JsonFormat: {username,password,extension,base64}
  public register(data : any) : Observable<any>{
    return this.http.post(`${this.ip}/upload`,data);
  }
  
  public setUser(user: any) : void{
    let usr_string = JSON.stringify(user);
    localStorage.setItem('currentuser',usr_string);
  }

  public getCurrentUser(){
    let user_string = localStorage.getItem('currentuser');
    if(!isNullOrUndefined(user_string)){
      let user = JSON.parse(user_string);
      return user;
    }
    return false;
  }

  public removeUser() : void{
    localStorage.removeItem("currentUser");
  }

  public showSuccess(mensaje : string, title : string){
    this.toastr.success(mensaje,title,{
      timeOut : 1500
    });
  }

  public showDanger(mensaje : string, title : string){
    this.toastr.error(mensaje,title,{
      timeOut : 1500
    });
  }

}
