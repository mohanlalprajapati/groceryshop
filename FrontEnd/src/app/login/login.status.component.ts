import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-loginstatus',
  templateUrl: './login.status.component.html',
  styleUrls: ['./login.status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isLoggedIn: boolean = false;
  userName: string = "";
  constructor(private acc: AccountService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.acc.isLoggesIn.subscribe((loginstatus: boolean) => {
      this.isLoggedIn = loginstatus;
      if (this.isLoggedIn) {
        this.acc.currentUserName.subscribe((username) => {
          this.userName = username as string;
        });
      }
    }, error => {
      console.log(error);
    });
  }
  Logout() {
    this.acc.logout();
    this.router.navigate(['/login']);
  }

}
