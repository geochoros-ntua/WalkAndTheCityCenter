import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import Overlay from 'ol/Overlay';
import Layer from 'ol/layer';
import mappingsData from '../../../assets/geodata/lookup.json';
import {highlightStyle} from '../map.helper';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector } from 'ol/source';
import { MapLayersService } from './maplayers.service';
import { BehaviorSubject } from 'rxjs';
import {featureClickedWithPos} from '../api/map.interfaces'
import { MapStatsService } from './mapstats.service';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map:Map;
  private selectedCity:Feature;
  private hoveredCity:Feature;
  private mappings:any = mappingsData.lookups;
  public dataLoaded:boolean;
  public selectedIndex:string = 'Score';
  public featureClicked$ = new BehaviorSubject<featureClickedWithPos>(null);
  

  constructor(
    private mapLayerService:MapLayersService, 
    private mapStatsService:MapStatsService) {

  }

  public createMap(id): Map {
    this.map = new Map({
      target: id,
      controls: defaultControls({zoom:false,attribution : false}),
      view: new View({
        center: olProj.fromLonLat([15.0785, 51.4614]),
        projection: 'EPSG:3857',
        zoom: 1
      })
    });
    this.registerMapEvents();
    return this.map;
  }

  public getCurrentMap(){
    return this.map;
  }

  public getPopUpOverlay(): Overlay{
    return this.map.getOverlayById('popupoverlay')
  }

  
  private registerMapEvents(){
    const this_= this;
    this.map.on('click', (event) => {
      const resolution= this_.map.getView().getResolution();
      this_.getPopUpOverlay().setPosition(undefined);
      this_.map.forEachFeatureAtPixel(event.pixel, (feature,layer) => {
        if (layer.get("title")==="WALK" && resolution < 50){
          this.featureClicked$.next({
            feat:feature,
            coord:event.coordinate});
          return;
        } else if (layer.get("title")==="CITY_BNDS" && resolution > 50) {
          if (this_.selectedCity){
            this_.selectedCity.setStyle(undefined);
          }
          this_.selectedCity = feature;
          this_.selectedCity.setStyle(highlightStyle)
          this_.loadAndZoomToCity();
          this_.getPopUpOverlay().setPosition(undefined);
        } else {
          //this_.getPopUpOverlay().setPosition(undefined);
        }
      });
    });


    this.map.on('pointermove', (e) => {
      if (this.hoveredCity){
        if (this.selectedCity !== this.hoveredCity){
          this.hoveredCity.setStyle(undefined);
          this.hoveredCity = null;
        }
        this_.map.getViewport().style.cursor = '';
      } 
      this_.map.forEachFeatureAtPixel(e.pixel,(f) => {
          this.hoveredCity = f;
          this.hoveredCity.setStyle(highlightStyle);
          this.map.getViewport().style.cursor = 'pointer';
          return true;
      },{
        layerFilter : (lyr:Layer) => {
          return lyr.get('title') === 'CITY_BNDS';
        }
      });
    });
  }



  loadAndZoomToCity = ():void => {
    this.dataLoaded = false;
    const newSource = new Vector({
      format: new GeoJSON({
        defaultDataProjection:'EPSG:3857',
        featureProjection:'EPSG:3857',
        geometryName:'geometry'
      }),
      url: 'assets/geodata/'+ this.selectedCity.get('City').toLowerCase() +'.geojson',
      wrapX:false
    })
    const WALK = this.mapLayerService.getWalkabilityLayer()
    WALK.getSource().clear();
    WALK.setSource(newSource);
    WALK.setMaxResolution(1000000);
    newSource.once('change', () => {
      if (newSource.getState() == 'ready' && newSource.getFeatures().length > 0 ) {
        const vals = new Array();
        newSource.getFeatures().forEach((feat)=>{
          vals.push(feat.get(this.selectedIndex))
        })
      this.mapStatsService.getAndSetClassesFromData(vals);
      this.zoomToSelCityExtent();
      this.dataLoaded = true;
      } 
    })
    
    
  }
  zoomToSelCityExtent = ():void => {
    this.map.getView().fit(this.selectedCity.getGeometry().getExtent(),{
     padding:[100,100,100,100],
      size:this.map.getSize(),
      duration: 2000
    });
    this.mapLayerService.getWalkabilityLayer().setMaxResolution(50);
 }

  getTitleFromMappingCode = (code:string):string[] => {
    const title = this.mappings.filter( elem => {
      return elem.Code === code;
    });
    
    if (title.length > 0){
    return title[0].indiname;
    } else {

    }
  }

  showSelector = ():boolean =>{
    if (this.dataLoaded && this.map.getView().getResolution()<=50){
      return true;
    } else {
      return false;
    }
  }


}