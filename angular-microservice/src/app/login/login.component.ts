import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IStandardRes } from '../shared/interfaces/istandardres';
// import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  errorMsg = '';

  loginForm = new FormGroup({
    username: new FormControl(''),
    pass: new FormControl(''),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const { username, pass } = this.loginForm.value;
    this.subscription = this.loginService.login({
      username, pass
    }).subscribe((res: IStandardRes) => {
      if (!res.status) {
        this.loginForm.patchValue({
          username: '',
          pass: ''
        });
        this.errorMsg = res.msg;
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
