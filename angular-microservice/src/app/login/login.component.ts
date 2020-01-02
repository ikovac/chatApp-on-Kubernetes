import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    pass: new FormControl(''),
  });

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const {username, pass} = this.loginForm.value;
    this.loginService.login({
      username, pass
    }).subscribe(res => {
      console.log("RES: ", res);
    });
  }
}
