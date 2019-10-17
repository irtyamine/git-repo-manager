import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() lastUpdate: string;
  @Input() dataSource: string;

  constructor() {}

  public logout() {
    window.location.href = `${environment.url}/api/github/logout`;
  }

  public setDataSource(dataSource: string) {
    switch (dataSource) {
      case 'github':
        return 'GitHub';
      case 'gitlab':
        return 'GitLab';
    }
  }

}
