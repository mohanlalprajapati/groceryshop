import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private acc:AccountService) { }

  ngOnInit(): void {
    this.isLoggedIn = false;
    this.acc.isLoggesIn.subscribe((loginstatus: boolean) => {
      this.isLoggedIn = loginstatus;
    }, error => {
      console.log(error);
    });
  }

}
