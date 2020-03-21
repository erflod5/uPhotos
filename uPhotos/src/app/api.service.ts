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
  ip2 : string = 'https://0ass0taz6d.execute-api.us-west-2.amazonaws.com/api/facescompare';
  
  constructor(private http : HttpClient, private toastr : ToastrService) { }

  //http://localhost:3000/api/upload
  //JsonFormat: {username,password,extension,base64}
  public register(data : any) : Observable<any>{
    return this.http.post(`${this.ip}/signin`,data);
  }
  
  public newImage(data : any) : Observable<any>{
    return this.http.post(`${this.ip}/upload`,data);
  }

  public getFotosMias() : Observable<any>{
    return this.http.get(`${this.ip2}?username=${this.getCurrentUser().username}`);
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
    localStorage.removeItem("currentuser");
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

  public showInfo(mensaje :string, title : string){
    this.toastr.info(mensaje,title,{
      timeOut : 1500
    });
  }

  //LOGIN
  //Reconocimiento Facial
  public iniciarSesion(data : any) : Observable<any>{
    return this.http.post(`${this.ip}/iniciarSesion`,data);
  }
  //Form
  public login(data : any) : Observable<any>{
    return this.http.post(`${this.ip}/login`,data);
  }


}
