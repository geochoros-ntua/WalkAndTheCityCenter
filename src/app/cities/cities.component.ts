import { CitiesDataService } from './../cities-data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotateY(0)' })),
      state('rotated', style({ transform: 'rotateY(360deg)' })),
      transition('rotated => default', animate('800ms ease-in-out')),
      transition('default => rotated', animate('800ms ease-in-out'))
    ])
  ],
})


export class CitiesComponent implements OnInit {

  

  cities = [];
  selectedVariable;
  suffix = "";
  reverse: boolean = false;
  headers = [];
  


  constructor(private citiesDataService:CitiesDataService) {

    this.citiesDataService.citiesData$.subscribe(data => {
      if (data) {
        this.cities = data;
      }
    });




  }

  ngOnInit(): void {
    this.cities = this.citiesDataService.getCities();
    this.headers = this.citiesDataService.getHeaders();
    this.selectedVariable = this.citiesDataService.getHeaders()[0];
  }

  

  sortCities(variable: any, reverse: boolean, toggle: boolean) {

    if (variable) {
      if (!toggle) {
        variable = variable.value;
      }

      if (!reverse) {
        if (variable.value === 'alphabetical') {
          this.cities.sort((a: any, b: any) => {
            return a.name.localeCompare(b.name);
          });
        }
        else {
          this.cities.sort((a: any, b: any) => {
            return b[variable.value] - a[variable.value];
          });
        }

      }
      else {
        if (variable.value === 'alphabetical') {
          this.cities.sort((a: any, b: any) => {
            return b.name.localeCompare(a.name);
          });
        }
        else {
          this.cities.sort((a: any, b: any) => {
            return a[variable.value] - b[variable.value];
          });
        }

      }

      for (let index = 0; index < this.cities.length; index++) {

        if (!reverse) {
          this.cities[index].order_number = index + 1;
        }
        else {
          this.cities[index].order_number = this.cities.length - index;
        }
        this.cities[index].selected_variable = this.cities[index][variable.value];
      }
      if (this.selectedVariable.value.startsWith("crossing")) {
        this.suffix = "of crossing segments total length";
      }
      else {
        this.suffix = "of street segments total length";
      }


    }
  }

  flipImage(city) {

    city.state === 'default' ? city.state = 'rotated' : city.state = 'default';

    setTimeout(() => {
      for (let index = 0; index < this.cities.length; index++) {
        const element = this.cities[index];

        if (element.name === city.name) {
          element.flipped_image = !element.flipped_image;
        }

      }
    }, 400);



  }

}
