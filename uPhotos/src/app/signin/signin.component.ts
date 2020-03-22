import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private username : string;
  private password : string;
  private confirmPassword : string;
  private selectedFile: ImageSnippet;
  srcImg : string = '../../assets/hiclipart.com.png';

  constructor(private apiService : ApiService, private router : Router) { }

  ngOnInit(): void {
  }

  //Handler Username
  user(event: any) {
    this.username = event.target.value;
  }

  //Handler Password
  pass(event: any) {
    this.password = event.target.value;
  }

  //Handler ConfirmPassword
  confirmPass(event: any){
    this.confirmPassword = event.target.value;
  }

  //Post Request
  signin(){
    if(this.password == this.confirmPassword){
      let data = {
        username : this.username,
        password : this.password,
        extension : this.selectedFile === undefined ? false : this.selectedFile.file.type.split('/')[1],
        base64 : this.selectedFile === undefined ? false : this.selectedFile.src,
      };
      console.log(data);
      this.apiService.register(data).subscribe(
        (res) =>{
          console.log(res);
          if(res.status == false){
            this.apiService.showDanger('Error!','Ya existe el user');
          }
          else{
            this.apiService.setUser(res);
            this.apiService.showSuccess('Bienvenido!','Usuario creado correctamente');
            this.router.navigate(['/user']);
          }
        },
        (err) => {
          this.apiService.showDanger('Error!','Ya existe el user');
        }
      );
    }
    else{
      this.apiService.showDanger('Error!','Las contraseñas no coinciden');
    }
  }

  //Handler ProfileImg
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      this.srcImg = this.selectedFile.src;
    });
    reader.readAsDataURL(file);
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}