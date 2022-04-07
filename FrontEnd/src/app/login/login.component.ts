import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userName!: FormControl;
  password!: FormControl;
  returnUrl!: string;
  errorMessage: string = "";
  invalidLogin: boolean = false;

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.userName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required]);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginForm = this.fb.group({
      UserName: this.userName,
      Password: this.password
    });
  }

  get UserName(): FormControl {
    return this.loginForm.get('UserName') as FormControl;
  }
  get Password(): FormControl {
    return this.loginForm.get('Password') as FormControl;
  }
  onSubmit() {
    const userlogin = this.loginForm.value;
    this.accountService.login(userlogin.UserName, userlogin.Password).subscribe({ next: (result) => {

      this.invalidLogin = false;
      this.errorMessage = "";
      this.router.navigateByUrl(this.returnUrl);

    },
      error: (error) => {
        this.invalidLogin = true;
        switch (error.status) {
          case 401:
            this.errorMessage = error.error.detail;
            break;
          case 0:
            this.errorMessage = 'Not able to connect to grocery service';
            break;
          default:
            this.errorMessage = 'Unknown Error. Please contact to programing team.';
        }

      }});
  }
}
