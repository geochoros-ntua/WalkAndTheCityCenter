import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  name = 'Walk & the City Center';

  constructor(private router:Router){
     
  }

  public reloadMapPage(){ 
  this.router.navigate(['app-map']).then(()=>{
    window.location.reload();
  }
  );
  }
  
}
