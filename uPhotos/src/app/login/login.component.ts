import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username : string = '';
  private password : string = '';
  constructor() { }

  ngOnInit(): void {
  }

  login(){
    alert('Login: ' + this.username + ' - ' + this.password);
  }

  captura(){
    alert('Captura');
  }

  user(event: any) { // without type info
    this.username = event.target.value;
  }

  pass(event: any) { // without type info
    this.password = event.target.value;
  }
}
