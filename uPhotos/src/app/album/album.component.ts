import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  
  url = 'https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
  url2 = 'https://images.pexels.com/photos/1038002/pexels-photo-1038002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  url3 = 'https://images.pexels.com/photos/56005/fiji-beach-sand-palm-trees-56005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

  //data = [[this.url,this.url2,this.url3],[this.url3,this.url],[this.url,this.url3,this.url2,this.url,this.url2]];
  
  albums = [];
  data : Array<any> = [];
  actualAlbum : string;
  actualData : Array<string>;
  imgSeleccion: string = "";
  constructor(private apiService : ApiService) {
    this.actualAlbum = this.albums.length == 0 ? 'Empty' : this.albums[0];
    this.actualData = this.albums.length == 0 ? [] : this.data[0];
  }

  ngOnInit(): void {
    this.getFotos();
  }

  change(i){
    this.actualAlbum = this.albums[i];
    this.actualData = this.data[i];
  }

  getFotos(){
    this.apiService.getFotos().subscribe(
      (res) =>{
        res.body[0].pictures.forEach(element => {
          let albumName = element.tag;
          console.log(albumName);
          let existe = false;
          let i = 0;
          for(const name of this.albums){
            if(name == albumName){
              existe = true;
              this.data.push([]);
              this.data[i].push(element.src);
            }
            i++;
          }
          if(!existe){
            this.albums.push(albumName);
            this.data.push([]);
            this.data[i].push(element.src);
          }
    
        });
        this.actualAlbum = this.albums[0];
        this.actualData = this.data[0];
      },
      (err) =>{
        console.log(err);
      }
    )
  }

  setImg(src){
    this.imgSeleccion = src;
  }


  

}
