import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  urlProfImage : string;
  constructor(private router: Router) { 
    this.urlProfImage = 'https://images.pexels.com/photos/38238/maldives-ile-beach-sun-38238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
  }

  ngOnInit(): void {
  }

  logout(){
    console.log('Logout');
  }
}
