import { Component, OnInit } from '@angular/core';
import { MapService } from '../../map.service';
import { MapLayersService } from '../../maplayers.service';

@Component({
  selector: 'app-worldzoom',
  templateUrl: './worldzoom.component.html',
  styleUrls: ['./worldzoom.component.scss']
})
export class WorldzoomComponent implements OnInit {

  constructor(private mapLayersService:MapLayersService, private mapService: MapService) { }

  ngOnInit(): void {
  }

  click() {
    const cityLyr = this.mapLayersService.getCityBoundLayer();
        
    this.mapService.getCurrentMap().getView().fit(cityLyr.getSource().getExtent(),{
        padding:[100,100,100,100],
         size:this.mapService.getCurrentMap().getSize(),
         duration:2000
       });

    }

}
