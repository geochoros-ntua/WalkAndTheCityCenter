import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CitiesDataService } from '../cities-data.service';
import Chart from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { ShareChartModalComponent } from './share-chart-modal/share-chart-modal.component';
import { clear } from 'console';
import { zip } from 'rxjs';

export interface ChartShareParams {
  cities: string,
  variables: string
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @ViewChild('downloadLink') downloadLink: ElementRef;

  cities = [];
  headers = [];

  selectedCities = [];
  selectedVariables = [];

  hasGraph: boolean = false;

  data = {
    labels: [""],
    datasets: [
      { data: [] }
    ]
  };

  chartCtrlsGroup = new FormGroup({
    citiesCtrl: new FormControl(),
    variablesCtrl: new FormControl()
  });

  options = {
    backgroundColor: "#F5DEB3",
    legend: {
      position: 'top',
      labels: {
        fontColor: 'white',
        fontSize: 16,
        fontFamily: 'Rajdhani, sans-serif'
      },
      // onClick: (e) => e.stopPropagation()
    },
    title: {
      display: true,
      position: 'bottom',
      text: 'Unit: % of city center\'s street- or crossing- segments',
      fontColor: 'white',
      fontSize: 12,
      fontStyle: 'normal',
      fontFamily: 'Rajdhani, sans-serif'
    },
    scale: {
      ticks: {
        beginAtZero: true,
        fontColor: 'white',
        fontSize: 16,
        fontFamily: 'Rajdhani, sans-serif',
        showLabelBackdrop: false, // hide square behind text
        suggestedMin: 0,
        suggestedMax: 100
      },
      pointLabels: {
        fontColor: 'white', // labels around the edge like 'Running'
        fontSize: 16,
        fontFamily: 'Rajdhani, sans-serif'
      },
      gridLines: {
        color: 'rgba(255, 255, 255, 0.2)'
      },
      angleLines: {
        color: 'white' // lines radiating from the center
      },
      // onClick: (e) => e.stopPropagation()
    }
  };

  // ctx = document.getElementById('spiderChart');



  constructor(private citiesDataService: CitiesDataService, public dialog: MatDialog, private router: ActivatedRoute) {

    this.citiesDataService.citiesData$.subscribe(data => {
      if (data) {
        this.cities = data;
        this.cities.sort((a: any, b: any) => {
          return a.name.localeCompare(b.name);
        });
      }
    });
  }

  ngOnInit(): void {



    this.cities = this.citiesDataService.getCities();
    this.headers = this.citiesDataService.getVariables();



    Chart.platform.disableCSSInjection = true;
    this.cities.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });
    this.hasGraph = false;

    zip(
      this.router.queryParams, this.citiesDataService.citiesData$).subscribe(([params, citiesData]) => {

        if (params.cities && params.variables) {
          let tempCities = JSON.parse(params.cities);
          let tempVariables = JSON.parse(params.variables);

          this.selectedCities = [];
          this.selectedVariables = [];
          if (citiesData) {
            this.cities = citiesData;
            this.cities.sort((a: any, b: any) => {
              return a.name.localeCompare(b.name);
            });
          }

          for (let index = 0; index < tempCities.length; index++) {
            const element = tempCities[index];

            for (let indexb = 0; indexb < this.cities.length; indexb++) {
              const elementb = this.cities[indexb];
              if (elementb.name === element) {
                this.selectedCities.push(elementb);
              }
            }
          }

          for (let index = 0; index < tempVariables.length; index++) {
            const element = tempVariables[index];

            for (let indexb = 0; indexb < this.headers.length; indexb++) {
              const elementb = this.headers[indexb];
              if (elementb.value === element) {
                this.selectedVariables.push(elementb);
              }
            }
          }

          this.hasGraph = false;

        }
        else {
          this.selectedCities = this.citiesDataService.getSelectedCities();
          this.selectedVariables = this.citiesDataService.getSelectedVariables();
        }

        if (this.selectedCities.length > 0 && this.selectedVariables.length > 0) {
          this.selectedCitiesAndVariables(this.selectedCities, this.selectedVariables);
        }

      });





  }

  clear() {
    this.selectedCities = [];
    this.selectedVariables = [];

    this.citiesDataService.setSelectedCities(this.selectedCities);
    this.citiesDataService.setSelectedVariables(this.selectedVariables);

    this.hasGraph = false;
  }

  comparer(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.name === o2.name : o2 === o2;
  }

  selectedCitiesAndVariables(cities, variables) {
    let myRadarChart = null;
    this.data = {
      labels: [],
      datasets: []
    };



    let chartColors = [
      'rgb(255, 99, 132)', // red
      'rgb(255, 159, 64)', // orange
      'rgb(255, 205, 86)', // yellow
      'rgb(75, 192, 192)', // green
      'rgb(54, 162, 235)', // blue
      'rgb(153, 102, 255)', // purple
      'rgb(231,233,237)' // grey
    ];
    let color = Chart.helpers.color;

    let datasets = [];
    if (cities.length > 0 && variables.length > 2) {
      this.hasGraph = true;

      for (let indexCity = 0; indexCity < cities.length; indexCity++) {

        this.citiesDataService.setSelectedCities(this.selectedCities);
        this.citiesDataService.setSelectedVariables(this.selectedVariables);


        const city = cities[indexCity];
        let dataset = {
          label: null,
          data: [],
          backgroundColor: null,
          borderColor: null,
          pointBackgroundColor: null
        }

        dataset.label = city.name;
        dataset.backgroundColor = color(chartColors[indexCity]).alpha(0.2).rgbString();
        dataset.borderColor = chartColors[indexCity];
        dataset.pointBackgroundColor = chartColors[indexCity];

        for (let indexVar = 0; indexVar < variables.length; indexVar++) {
          const variable = variables[indexVar];

          // if (variable.value === city[index][]) {
          dataset.data.push(city[variable.value])
          // }

        }

        datasets.push(dataset);
      }


      for (let index = 0; index < variables.length; index++) {
        const element = variables[index];

        this.data.labels.push(element.name);


      }

      this.data.datasets = datasets;

      myRadarChart = new Chart(document.getElementById('spiderChart'), {
        type: 'radar',
        data: this.data,
        backgroundColor: "#000000",
        options: this.options
      });
    }
    else {
      this.hasGraph = false;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShareChartModalComponent, {
    });
  }

  downloadChart() {
    let canvas = <HTMLCanvasElement>document.getElementById("spiderChart");

    this.downloadLink.nativeElement.href = canvas.toDataURL('image/jpeg');
    this.downloadLink.nativeElement.download = 'watcc_spider_chart.jpg';
    this.downloadLink.nativeElement.click();
  }



}
