import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CitiesDataService } from '../cities-data.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

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
      display: false,
      text: '',
      fontColor: 'white',
      fontSize: 16,
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



  constructor(private citiesDataService: CitiesDataService) {

    this.citiesDataService.citiesData$.subscribe(data => {
      if (data) {
        this.cities = data;
      }
    });
  }

  ngOnInit(): void {
    this.cities = this.citiesDataService.getCities();
    this.headers = this.citiesDataService.getVariables();
    Chart.platform.disableCSSInjection = true;
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
      // console.log(cities)
      // console.log(variables)
      this.hasGraph = true;

      for (let indexCity = 0; indexCity < cities.length; indexCity++) {
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

      // console.log(datasets)

      for (let index = 0; index < variables.length; index++) {
        const element = variables[index];

        this.data.labels.push(element.name);


      }

      this.data.datasets = datasets;

      console.log(this.data)



      myRadarChart = new Chart(document.getElementById('spiderChart'), {
        type: 'radar',
        data: this.data,
        options: this.options
      });
    }

  }

}
