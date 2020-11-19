import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map.service';
import { MapLayersService } from '../../maplayers.service';

@Component({
  selector: 'app-opacity-slider',
  templateUrl: './opacity-slider.component.html',
  styleUrls: ['./opacity-slider.component.scss']
})
export class OpacitySliderComponent implements OnInit {

  constructor(public mapService: MapService, private mapLayersService:MapLayersService) { }
  private walkOpacity:number;

  ngOnInit(): void {
    this.walkOpacity = 70;
  }

  setLyrOpacity = (event):void => {
    this.walkOpacity = event.value;
    this.mapLayersService.getWalkabilityLayer().setOpacity(this.walkOpacity/100);
    
  }

}
