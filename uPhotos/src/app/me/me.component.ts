import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

  data : Array<any> = [];
  imgSeleccion: string = "";
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.getFotos();
  }

  getFotos(){
    this.apiService.getFotosMias().subscribe(
      (res) =>{
        res.body[0].pictures.forEach(element => {
          if(element.itsme){
            this.data.push(element.src);
          }
        });
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
