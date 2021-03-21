import { CitiesDataService } from './../cities-data.service';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



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
    ]),
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          style({ transform: 'rotateY(0) translateX(0)', opacity: 1 }),
          stagger(10, [
            animate('.1s ease-in-out', style({ transform: 'rotateY(180deg) translateX(300px)', opacity: 0 }))
          ])
        ],
          { optional: true, limit: 5 }
        ),
        query('.city-card:enter', [
          style({ transform: 'rotateY(180deg) translateX(300px)', opacity: 0 }),
          stagger(100, [
            animate('.8s ease-in-out', style({ transform: 'rotateY(0) translateX(0)', opacity: 1 }))
          ])
        ],
          { optional: true, limit: 10 }
        )
      ])
    ]),
    trigger('RotateInB', [
      transition(':enter', [
        style({ transform: 'rotateY(360deg)' }),
        animate('.8s ease-in-out', style({ transform: 'rotateY(0)' })),
      ]),
    ]),
  ],
})


export class CitiesComponent implements OnInit {



  cities = [];
  selectedVariable;
  selectedRegion;
  selectedCountry: string = "";
  suffix = "";
  reverse: boolean = false;
  headers = [];
  regions = [];
  capitals: boolean = false;

  suffleCards = 0;

  constructor(private citiesDataService: CitiesDataService, private router: Router) {

    this.citiesDataService.citiesData$.subscribe(data => {
      if (data) {
        this.cities = data;
      }
    });




  }

  ngOnInit(): void {
    this.cities = this.citiesDataService.getCities();
    this.headers = this.citiesDataService.getHeaders();
    this.regions = this.citiesDataService.getRegions();
    // this.selectedVariable = this.citiesDataService.getHeaders()[0];
    // this.selectedRegion = this.regions[0];
    this.selectedVariable = this.citiesDataService.getSelectedVariable();
    this.selectedRegion = this.citiesDataService.getSelectedRegion();
    this.reverse = this.citiesDataService.getSelectedOrder();
    this.selectedCountry = this.citiesDataService.getSelectedCountry();
    this.capitals = this.citiesDataService.getIsCapitals();

    this.suffleCards = this.cities.length;

    this.sortCities(this.selectedVariable, this.reverse, true, this.selectedCountry, this.capitals);
  }

  clear() {
    this.selectedVariable = this.citiesDataService.getHeaders()[0];
    this.selectedRegion = this.citiesDataService.getRegions()[0];
    this.reverse = false;
    this.selectedCountry = "";
    this.capitals = false;
    this.citiesDataService.setSelectedRegion(this.selectedRegion);
    this.citiesDataService.setSelectedVariable(this.selectedVariable);
    this.citiesDataService.setSelectedOrder(this.reverse);
    this.citiesDataService.setIsCapitals(this.capitals);

    this.sortCities(this.selectedVariable, this.reverse, true, this.selectedCountry, this.capitals);
  }

  setSelectedCountry(country) {
    if (this.selectedCountry === country) {
      this.selectedCountry = "";
    }
    else {
      this.selectedCountry = country;
    }

    this.citiesDataService.setSelectedCountry(this.selectedCountry);
  }

  sortCities(variable: any, reverse: boolean, toggle: boolean, country: string, capitals: boolean) {

    this.suffleCards = Math.floor(Math.random() * Math.floor(60));
    let tempCities = this.citiesDataService.getCities();

    this.cities = [];
    this.citiesDataService.setSelectedRegion(this.selectedRegion);
    this.citiesDataService.setSelectedVariable(this.selectedVariable);
    this.citiesDataService.setSelectedOrder(this.reverse);
    this.citiesDataService.setIsCapitals(this.capitals);

    if (this.selectedRegion.value !== 'all') {
      let checkCountry = false;
      for (let index = 0; index < tempCities.length; index++) {
        const element = tempCities[index];
        if (element.region === this.selectedRegion.name) {
          this.cities.push(element)
        }

      }

      for (let index = 0; index < this.cities.length; index++) {
        const element = this.cities[index];
        if (element.country === this.selectedCountry) {
          checkCountry = true;
        }
      }

      if (!checkCountry) {
        this.setSelectedCountry("")
      }



    }
    else {
      this.cities = tempCities;

    }


    if (this.selectedCountry !== "" && this.selectedCountry !== null) {
      tempCities = this.cities;
      this.cities = [];
      for (let index = 0; index < tempCities.length; index++) {
        const element = tempCities[index];
        if (tempCities[index].country === this.selectedCountry) {
          this.cities.push(element);

        }
      }

    }

    if (this.capitals) {
      tempCities = this.cities;
      this.cities = [];
      for (let index = 0; index < tempCities.length; index++) {
        const element = tempCities[index];
        if (tempCities[index].is_capital === true) {
          this.cities.push(element);

        }
      }

    }

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


      // this.suffleCards = this.cities.length;

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

  navigateToMap(zoom, center, city, index) {
    this.router.navigate(['/app-map'], { queryParams: { zoom: zoom, center: center, city: city, statIndex: index } });
  }

}
