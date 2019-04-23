import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CronJob } from 'cron';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public appErrorCondition: boolean = true;
  public errorAlert: string;

  constructor(public router: Router, private auth: AuthService) {  }

  ngOnInit() {
    this.checkForAuthentication();
    // NIGHT
    new CronJob('00 00 00 * * *', () => {
      this.checkForAuthentication();
    }, null, true, 'Europe/Kiev');

    // MORNING
    new CronJob('00 00 06 * * *', () => {
      this.checkForAuthentication();
    }, null, true, 'Europe/Kiev');

    // AFTERNOON
    new CronJob('00 00 12 * * *', () => {
      this.checkForAuthentication();
    }, null, true, 'Europe/Kiev');

    // EVENING
    new CronJob('00 00 18 * * *', () => {
      this.checkForAuthentication();
    }, null, true, 'Europe/Kiev');
  }

  public checkForAuthentication() {
    return this.auth.checkAuthTokenExists().subscribe(res => {
      if (!res) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/table-repositories']);
      }
    }, err => {
      if (err.indexOf('Unauthorized', 0) >= 0) {
        this.router.navigate(['/login']);
        this.appErrorCondition = false;
        this.errorAlert = 'Oops! Something went wrong during authentication process or auth token expired';
      }
    });
  }
}
