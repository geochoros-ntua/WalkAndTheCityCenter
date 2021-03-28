import { Component, OnInit } from '@angular/core';
import { MapLayersService } from '../../services/maplayers.service';
import { MapStatsService } from '../../services/mapstats.service';

@Component({
  selector: 'app-stats-styler-modal',
  templateUrl: './stats-styler-modal.component.html',
  styleUrls: ['./stats-styler-modal.component.scss']
})
export class StatsStylerModalComponent implements OnInit {

  public selectedMethod: string;
  public selectedNumClasses: number;
  public invert: boolean;
  public numOfBest: number;

  constructor(
    private mapLayersService: MapLayersService, 
    public mapStatsService: MapStatsService) { 

    }

  ngOnInit(): void {
    this.selectedMethod = this.mapStatsService.statMethod;
    this.selectedNumClasses = this.mapStatsService.numOfClasses;
    this.invert = this.mapStatsService.invertColors;
    this.numOfBest = this.mapStatsService.numOfHighLights;
    
  }

  public setStatsMethod(method: string): void{
    this.selectedMethod = method;
  }

  public setClassesNum(val: string): void{
    this.selectedNumClasses = parseInt(val);
  }

  public setInvert(val: boolean): void{
    this.invert = val;
  }

  public setNumOfBest(val: number): void {
    this.numOfBest = val;
  }

  public applyStyle(): void{
    this.mapStatsService.statMethod = this.selectedMethod;
    this.mapStatsService.numOfClasses = this.selectedNumClasses;
    this.mapStatsService.invertColors = this.invert;
    this.mapStatsService.numOfHighLights = this.numOfBest;
    const vals = this.mapLayersService.getWalkabilityLayer().getSource().getFeatures()
    .map(feat => feat.get(this.mapStatsService.selectedIndex));
    this.mapStatsService.getAndSetClassesFromData(vals);
    // hacky way to refresh layer
    this.mapLayersService.getWalkabilityLayer().setStyle(
      this.mapLayersService.getWalkabilityLayer().getStyle()
    );

  }

}
