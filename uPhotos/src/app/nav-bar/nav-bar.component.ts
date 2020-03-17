import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  urlProfImage : string;
  private selectedFile: ImageSnippet;
  srcImg : string = '../../assets/hiclipart.com.png';

  constructor(private router: Router, private apiService : ApiService) { 
    this.urlProfImage = 'https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
  }

  ngOnInit(): void {
    let user : any = this.apiService.getCurrentUser();
    if(user != false){
      this.urlProfImage = user.src;
    }
  }

  logout(){
    this.apiService.showInfo('Logout','Cerrando Sesion');
    this.apiService.removeUser();
    this.router.navigate(['/login']);
  }

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