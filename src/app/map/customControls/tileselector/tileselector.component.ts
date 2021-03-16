import { Component, OnInit } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import { MapService } from '../../services/map.service';
import { MapLayersService } from '../../services/maplayers.service';

@Component({
  selector: 'app-tileselector',
  templateUrl: './tileselector.component.html',
  styleUrls: ['./tileselector.component.scss']
})
export class TileselectorComponent implements OnInit {

  constructor(private mapLayersService:MapLayersService) {}

  ngOnInit(): void {
  
  }
  
  setTileLayer = (val:string) =>{
    if (val === "OSM"){
      this.mapLayersService.getCartoDarkLayer().setVisible(false);
      this.mapLayersService.getOSMLayer().setVisible(true); 
      this.mapLayersService.getGOSMLayer().setVisible(false);
    } 
    else if (val === "GOSM"){
      this.mapLayersService.getCartoDarkLayer().setVisible(false);
      this.mapLayersService.getOSMLayer().setVisible(false); 
      this.mapLayersService.getGOSMLayer().setVisible(true);
    } 
    else if (val === "CARTODARK"){
      this.mapLayersService.getCartoDarkLayer().setVisible(true);
      this.mapLayersService.getOSMLayer().setVisible(false); 
      this.mapLayersService.getGOSMLayer().setVisible(false);
    } 
    else if (val === "NONE"){
      this.mapLayersService.getCartoDarkLayer().setVisible(false);
      this.mapLayersService.getOSMLayer().setVisible(false); 
      this.mapLayersService.getGOSMLayer().setVisible(false);
    } 
  }
}
