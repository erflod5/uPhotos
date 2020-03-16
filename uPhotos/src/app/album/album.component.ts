import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  albums = ['Album1','Album2','Album3'];
  url = 'https://images.pexels.com/photos/62307/air-bubbles-diving-underwater-blow-62307.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
  url2 = 'https://images.pexels.com/photos/1038002/pexels-photo-1038002.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
  url3 = 'https://images.pexels.com/photos/56005/fiji-beach-sand-palm-trees-56005.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

  data = [[this.url,this.url2,this.url3],[this.url3,this.url],[this.url,this.url3,this.url2,this.url,this.url2]];
  actualAlbum : string;
  actualData : Array<string>;
  constructor() { 
    this.actualAlbum = this.albums.length == 0 ? 'Empty' : this.albums[0];
    this.actualData = this.albums.length == 0 ? [] : this.data[0];
  }

  ngOnInit(): void {
  }

  change(i){
    this.actualAlbum = this.albums[i];
    this.actualData = this.data[i];
  }
}
