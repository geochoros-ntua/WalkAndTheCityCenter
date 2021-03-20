import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Map from 'ol/Map';
import proj4 from 'proj4';
import * as olProj from 'ol/proj';
import { MapService } from './services/map.service';
import { MapLayersService } from './services/maplayers.service';
import Feature from 'ol/Feature';
import {MapShareParams} from './api/map.interfaces';
import { MapStatsService } from './services/mapstats.service';

// ng build --prod --base-href /walkandthecitycenter/

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  

  constructor(
    private router: ActivatedRoute,
    public mapService: MapService, 
    private mapStatsService: MapStatsService,
    private mapLayersService:MapLayersService) {}
    map: Map;
    walkOpacity:number;

  ngOnInit(){
    
    const this_ = this; 
    proj4.defs('urn:ogc:def:crs:EPSG::3857', proj4.defs('EPSG:3857'));
    const layers = [
      this.mapLayersService.initCartoDarkLayer(), 
      this.mapLayersService.initOSMLayer(), 
      this.mapLayersService.initGOSMLayer(), 
      this.mapLayersService.initCityBoundsLayer(),
      this.mapLayersService.initWalkabilityLayer()
    ];

    this.router.queryParams.subscribe((params: MapShareParams) => {
      if (params.zoom && params.center) {
        const zoomLevel: number = parseInt(params.zoom);
        const coords: string[] = params.center.split(',');
        const city: string = params.city;
        const statIndex: string = params.statIndex;
        const mapCenter = olProj.fromLonLat([parseFloat(coords[0]), parseFloat(coords[1])])
        this.map = this.mapService.createMap('walk_map', zoomLevel, mapCenter);
        layers.forEach((lyr) => {
          this.map.addLayer(lyr);
        });
        this.mapLayersService.getCityBoundLayer().once('change', () => {
          const selCity: Feature[] = this.mapLayersService
          .getCityBoundLayer().getSource().getFeatures()
          .find(feat => feat.get('City')===city);

          if (statIndex){
            this_.mapService.selectedIndex = statIndex;
            this_.mapStatsService.selectedIndex = statIndex;
          }
          if (selCity){
          this_.mapService.selectCity(selCity);
          }
          this_.map.updateSize();
        })
      } else {
        this.map = this.mapService.createMap('walk_map', 3, olProj.fromLonLat([15.0785, 51.4614]));
        layers.forEach((lyr) => {
          this.map.addLayer(lyr);
        });
        this.mapLayersService.getCityBoundLayer().once('change', () => {
          this_.zoomToCities();
          this_.map.updateSize();
        })
      }
    });
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