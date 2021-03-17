import { Injectable, ViewContainerRef } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import {styleFnCities} from '../map.helper';
import { MapStatsService } from './mapstats.service';


@Injectable({
  providedIn: 'root'
})
export class MapLayersService {

    private OSMLayer:TileLayer;
    private GOSMLayer:TileLayer;
    private cartoDBDark:TileLayer;
    private WALK:Vector;
    private CITY_BNDS:ViewContainerRef;
    constructor(private mapStatsService:MapStatsService) {

    }

   public initOSMLayer = (): TileLayer =>{
    this.OSMLayer = new TileLayer({
        title: 'OSM',
        visible:false,
        source: new OSM()
        });
    
        return this.OSMLayer;
   }

   
   public initGOSMLayer = (): TileLayer =>{
    this.GOSMLayer = new TileLayer({
        title: 'GOSM',
        visible:false,
        source: new OSM({
        url: 'http://mt{0-3}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        })
    });
    return this.GOSMLayer;
   }

   public initCartoDarkLayer = (): TileLayer =>{
   this.cartoDBDark = new TileLayer({
    visible:true,
    source: new XYZ({
      url: 'https://cartodb-basemaps-b.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
    })
  });
    return this.cartoDBDark;
  }
  
  public initWalkabilityLayer = (): VectorLayer =>{
    this.WALK = new VectorLayer({
        visible:true,
        title: 'WALK',
        //maxResolution: 50,
        opacity:0.7,
        style:this.mapStatsService.styleFnWalkGrids,
        source:new Vector({
            format: new GeoJSON({
              defaultDataProjection:'EPSG:3857',
              featureProjection:'EPSG:3857',
              geometryName:'geometry'
            }),
            wrapX:false
        })
    })
     return this.WALK;
  }
   
   public initCityBoundsLayer = (): VectorLayer =>{
    this.CITY_BNDS = new VectorLayer({
        visible:true,
        title: 'CITY_BNDS',
        style: styleFnCities,
        source:new Vector({
            format: new GeoJSON({
              defaultDataProjection:'EPSG:3857',
              featureProjection:'EPSG:3857',
              geometryName:'geometry'
            }),
            url: 'assets/geodata/city_boundaries.geojson',
            wrapX:false
        })
    });
     return this.CITY_BNDS;
}

   public getGOSMLayer():TileLayer {
    return this.GOSMLayer;
   }

   public getOSMLayer():TileLayer {
    return this.OSMLayer;
   }

   public getCartoDarkLayer():TileLayer {
    return this.cartoDBDark;
   }

   public getWalkabilityLayer():Vector {
    return this.WALK;
   }

   public getCityBoundLayer():TileLayer {
    return this.CITY_BNDS;
   }
   
}