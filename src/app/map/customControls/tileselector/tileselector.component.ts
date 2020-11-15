import { Component, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { MapService } from '../../map.service';
import { MapLayersService } from '../../maplayers.service';

@Component({
  selector: 'app-tileselector',
  templateUrl: './tileselector.component.html',
  styleUrls: ['./tileselector.component.scss']
})
export class TileselectorComponent implements OnInit {

  constructor(
    private mapService: MapService, 
    private mapLayersService:MapLayersService
    ) {
      this.mapLayersService = mapLayersService;
     }

  ngOnInit(): void {
  
  }

  
  setTileLayer = (val:string) =>{
    console.log('val===',val)
    if (val === "OSM"){
      this.mapLayersService.getOSMLayer().setVisible(true); 
      this.mapLayersService.getGOSMLayer().setVisible(false);
    } 
      else if (val === "GOSM"){
      this.mapLayersService.getOSMLayer().setVisible(false); 
      this.mapLayersService.getGOSMLayer().setVisible(true);
    } 
    else if (val === "NONE"){
      this.mapLayersService.getOSMLayer().setVisible(false); 
      this.mapLayersService.getGOSMLayer().setVisible(false);
    } 
  }
}
