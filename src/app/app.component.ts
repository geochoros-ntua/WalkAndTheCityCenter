import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  name = 'Walk & the City Center';


  constructor(private router: Router) {

  }

  
/**
 * We probably dont need these two reload methods any more
 * Keep it for a while as a reference just in case photis wants again crazy things .... 
 */
  public reloadMapPage() {
    //trick the router that navigation has not been used
    this.router.navigated = false;
    this.router.navigate(['app-map'])
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        window.location.reload();
      }
    });

  }

  reloadHomePage() {
    this.router.navigated = false;
    this.router.navigate(['home'])
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        window.location.reload();
      }
    });
  }

}
