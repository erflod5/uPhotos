import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ApiService } from '../api.service';
import { Subject, Observable } from "rxjs";
import { WebcamImage, WebcamInitError, WebcamUtil } from "ngx-webcam";
import { Router } from '@angular/router';
import { strict } from 'assert';
//import { $ } from 'protractor';
declare var $: any;
const IP:string = 'http://localhost:3000';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private username: string = "";
  private password: string = "";

  constructor(private apiService : ApiService, private router : Router) { }

  login() {
    //alert("Login: " + this.username + " - " + this.password);
    let user = {username: this.username, password: this.password}
    this.apiService.login(user).subscribe(
      (res) =>{
        //console.log(res);
        if(res.estado){
          this.apiService.showSuccess('', 'Bienvenido '+ res.username);
          let user = {
            username: res.username,
            src : res.src
           }
          this.apiService.setUser(user);
          //this.apiService.showSuccess('Ingreso Exitoso', 'Bienvenido '+res.username);
          this.router.navigate(['/user']);
        }else{
          this.apiService.showDanger('', 'Usuario o password incorrectos.');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  user(event: any) {
    // without type info
    this.username = event.target.value;
  }

  pass(event: any) {
    // without type info
    this.password = event.target.value;
  }

  public pictureTaken = new EventEmitter<WebcamImage>();
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();
  public ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }
  public triggerSnapshot(): void {
    this.trigger.next();
  }
  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }
  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  public handleImage(webcamImage: WebcamImage): void {
    
    let param = {sourceBase64: webcamImage.imageAsDataUrl.replace('data:image/jpeg;base64,', '')};
    console.log(param);
    this.apiService.iniciarSesion(param).subscribe(
      (res) =>{
        //console.log(res);
        if(res.estado){
          this.apiService.showSuccess('', 'Bienvenido '+ res.username.S);
          let user = {
            username: res.username.S,
            src : res.src
           }
          this.apiService.setUser(user);
          //this.apiService.showSuccess('Ingreso Exitoso', 'Bienvenido '+res.username.S);
          this.router.navigate(['/user']);
        }else{
          this.apiService.showDanger('', 'Rostro no registrado.');
        }
      },
      (err) => {
        console.log(err);
      }
    );
    console.log(webcamImage.imageAsDataUrl);
    console.info("received webcam image", webcamImage);
    this.pictureTaken.emit(webcamImage);
  }
  public cameraWasSwitched(deviceId: string): void {
    console.log("active device: " + deviceId);
    this.deviceId = deviceId;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}
