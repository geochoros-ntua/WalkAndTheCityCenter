import { Injectable, ViewContainerRef } from '@angular/core';
import { MapService } from './map.service';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import {styleFnCities} from './map.helper';
import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';


@Injectable({
  providedIn: 'root'
})
export class MapLayersService {

    private OSMLayer:TileLayer;
    private GOSMLayer:TileLayer;
    private WALK:Vector;
    private CITY_BNDS:ViewContainerRef;
    constructor(private mapService: MapService) {

    }

   public initOSMLayer = (): TileLayer =>{
    this.OSMLayer = new TileLayer({
        title: 'OSM',
        visible:true,
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

   public initWalkabilityLayer = (): VectorLayer =>{
    this.WALK = new VectorLayer({
        visible:true,
        title: 'WALK',
        maxResolution: 50,
        opacity:0.7,
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
        minResolution: 50,
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

   public getWalkabilityLayer():Vector {
    return this.WALK;
   }

   public getCityBoundLayer():TileLayer {
    return this.CITY_BNDS;
   }
   
}