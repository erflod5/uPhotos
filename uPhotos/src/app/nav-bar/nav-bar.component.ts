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
    console.log('Logout');
  }
}
