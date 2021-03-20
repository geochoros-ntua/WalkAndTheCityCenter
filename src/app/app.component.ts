import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  name = 'Walk & the City Center';


  constructor(private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-44969591-7',
          {
            'home': event.urlAfterRedirects,
            'cities': event.urlAfterRedirects,
            'app-map': event.urlAfterRedirects,
            'chart': event.urlAfterRedirects,
            'app-help': event.urlAfterRedirects,
            'about-us': event.urlAfterRedirects,
          }
        );
      }
    });
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
