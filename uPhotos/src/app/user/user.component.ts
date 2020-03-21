import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private selectedFile: ImageSnippet;
  // url = 'https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
  // url2 = 'https://images.pexels.com/photos/1038002/pexels-photo-1038002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  // url3 = 'https://images.pexels.com/photos/56005/fiji-beach-sand-palm-trees-56005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

  data = [];
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
  }

  //Handler ProfileImg
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      var curentUser = this.apiService.getCurrentUser();
      var arreglo = curentUser.src.split('/');

      var data = {
        base64 : this.selectedFile.src,
        extension : this.selectedFile.file.type.split('/')[1],
        username : curentUser.username,
        profile : arreglo[arreglo.length - 1]
      };
      this.apiService.newImage(data).subscribe(
        (res) =>{
          console.log(res);
          this.apiService.showSuccess('Congrats!','Imagen subida correctamente');
          this.data.push(this.selectedFile.src);
        },
        (err) => {
          this.apiService.showSuccess('Error!','Ocurrio un error mientras se subia la imagen');
        }
      );
    });
    reader.readAsDataURL(file);
  }
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}