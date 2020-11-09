import { Component, OnInit } from '@angular/core';
// import citiesData from '../../assets/geodata/cities.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dummyCities = [
    {
      name: "Athens",
      country: "Greece",
      description: "Description?",
      walkability: "1.2",
      morevars: "more variables"
    },
    {
      name: "Athens",
      country: "Greece",
      description: "Description?",
      walkability: "1.2",
      morevars: "more variables"
    },
    {
      name: "Athens",
      country: "Greece",
      description: "Description?",
      walkability: "1.2",
      morevars: "more variables"
    },
    {
      name: "Athens",
      country: "Greece",
      description: "Description?",
      walkability: "1.2",
      morevars: "more variables"
    },
    {
      name: "Athens",
      country: "Greece",
      description: "Description?",
      walkability: "1.2",
      morevars: "more variables"
    },
    {
      name: "Athens",
      country: "Greece",
      description: "Description?",
      walkability: "1.2",
      morevars: "more variables"
    },
    {
      name: "Athens",
      country: "Greece",
      description: "Description?",
      walkability: "1.2",
      morevars: "more variables"
    },
  ]

  constructor() {

  }

  ngOnInit(): void {

  }

}
