import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inApp: boolean = false;
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.inApp = event.url.includes('/app');
      }
    });
  }
}
