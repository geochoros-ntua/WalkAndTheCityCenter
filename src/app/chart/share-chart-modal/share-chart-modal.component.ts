import { CitiesDataService } from './../../cities-data.service';
import { Component, OnInit } from '@angular/core';
import { Clipboard } from "@angular/cdk/clipboard";
import { environment as env } from '../../../environments/environment';


@Component({
  selector: 'app-share-chart-modal',
  templateUrl: './share-chart-modal.component.html',
  styleUrls: ['./share-chart-modal.component.scss']
})
export class ShareChartModalComponent implements OnInit {
  _selectedCities: string = "";
  _selectedVariables: string = "";
  selectedCities = [];
  selectedVariables = [];
  mainPath: string = env.mainUrl;

  constructor(private clipboard: Clipboard, private citiesDataService: CitiesDataService) { }

  ngOnInit(): void {
    
    this.selectedCities = this.citiesDataService.getSelectedCities();
    this.selectedVariables = this.citiesDataService.getSelectedVariables();
    let tempCities = [];
    let tempVariables = [];
    for (let index = 0; index < this.selectedCities.length; index++) {
      const element = this.selectedCities[index];
      tempCities.push(element.name);
    }
    for (let index = 0; index < this.selectedVariables.length; index++) {
      const element = this.selectedVariables[index];
      tempVariables.push(element.value);
    }
    this._selectedCities = JSON.stringify(tempCities);
    this._selectedVariables = JSON.stringify(tempVariables);
  }

  public copyInputMessage(message) {
    this.clipboard.copy(message.value);
  }



}
