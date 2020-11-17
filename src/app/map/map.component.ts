import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import proj4 from 'proj4';
import { MapService } from './map.service';
import {legendControl} from './customControls/legendControl';
import {zoomToWorldControl} from './customControls/zoomToWorldControl';
import {downloadControl} from './customControls/downloadControl';
import {zoomInOutControl} from './customControls/zooomInOutControl';
import { MapLayersService } from './maplayers.service';

// ng build --prod --base-href /walkandthecitycenter/

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  

  constructor(
    public mapService: MapService, 
    private mapLayersService:MapLayersService) {}

  map: Map;
  walkOpacity:number;

  ngOnInit(){
    const this_ = this; 
    proj4.defs('urn:ogc:def:crs:EPSG::3857', proj4.defs('EPSG:3857'));
    const layers = [
      this.mapLayersService.initOSMLayer(), 
      this.mapLayersService.initGOSMLayer(), 
      this.mapLayersService.initWalkabilityLayer(),
      this.mapLayersService.initCityBoundsLayer()
    ];
   

    this.map = this.mapService.createMap('walk_map');
    layers.forEach((lyr) => {
      this.map.addLayer(lyr);
    });
    
    this.map.addControl(new legendControl());
    this.map.addControl(new zoomToWorldControl());
    this.map.addControl(new downloadControl());
    this.map.addControl(new zoomInOutControl());

    this.mapLayersService.getCityBoundLayer().once('change', () => {
      this_.zoomToCities();
      this_.map.updateSize();
    })
    
  }

  setSelectedIndex(index:string){
    this.mapService.selectedIndex = index;
  }

  zoomToCities = ():void => {
    this.map.getView().fit(
      this.mapLayersService.getCityBoundLayer().getSource().getExtent(),{
      padding:[100,100,100,100],
       size:this.map.getSize(),
       duration: 2000
     });
  }

}