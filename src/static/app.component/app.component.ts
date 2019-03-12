import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private router: Router, private cookie: CookieService) {  }

  ngOnInit() {
    if (this.cookie.get('_auth_token')) {
      this.router.navigate(['/table-repositories']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}