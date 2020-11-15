import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import Overlay from 'ol/Overlay';
import mappingsData from '../../assets/geodata/lookup.json';
import {getAndSetClassesFromData,styleFnWalkGrids,highlightStyle} from './map.helper';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector } from 'ol/source';
import { MapLayersService } from './maplayers.service';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map:Map;
  private selectedCity:Feature;
  private hoveredCity:Feature;
  private mappings:any = mappingsData.lookups;
  dataLoaded:boolean;
  selectedIndex:string;

  constructor(private mapLayerService:MapLayersService) { }

  

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
    this.registrEvents();
    return this.map;
  }

  public getCurrentMap(){
    return this.map;
  }

  public getPopUpOverlay(): Overlay{
    return this.map.getOverlayById('popupoverlay')
  }

  
  private registrEvents(){
    const this_= this;
    this.map.on('click', (event) => {
      this_.getPopUpOverlay().setPosition(undefined);
      this_.map.forEachFeatureAtPixel(event.pixel, (feature,layer) => {
        if (layer.get("title")==="WALK"){
          const keys = feature.getKeys();
          let attrsTable ='<table class="mat-table  cdk-table"><tbody>';
          keys.filter( el => ['OBJECTID','geometry','Shape_Area','Shape_Leng'].indexOf( el ) < 0).forEach(key => {
              if (this.getTitleFromMappingCode(key).length ===1){
                attrsTable += '<tr class="mat-row"><td class="mat-cell">'+this.getTitleFromMappingCode(key)[0].indiname+':</td><td>'+parseFloat(feature.get(key)).toFixed(2)+'</td></tr>';
              } else {
                attrsTable += '<tr class="mat-row"><td class="mat-cell">'+key+':</td><td>'+feature.get(key)+'</td></tr>';
              }
          });
          attrsTable += '</tbody></table>';
          document.getElementById('popup-content').innerHTML = attrsTable;
          this_.getPopUpOverlay().setPosition(event.coordinate);
          return;
        } else if (layer.get("title")==="CITY_BNDS") {
          if (this_.selectedCity){
            this_.selectedCity.setStyle(undefined);
          }
          this_.selectedCity = feature;
          this_.selectedCity.setStyle(highlightStyle)
          this_.loadAndZoomToCity();
          this_.getPopUpOverlay().setPosition(undefined);
        } else {
          this_.getPopUpOverlay().setPosition(undefined);
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
          this.setPointerStyle(e);
          return true;
      },{
        layerFilter : (lyr) => {
          return lyr.get('title') === 'CITY_BNDS';
        }
      });
    });
  }

  setPointerStyle = (e) => {
    const pixel = this.map.getEventPixel(e.originalEvent);
    const hit = this.map.hasFeatureAtPixel(pixel);
    this.map.getViewport().style.cursor = hit ? 'pointer' : '';
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
    newSource.on('change', () => {
      if (newSource.getState() == 'ready' && newSource.getFeatures().length > 0 ) {
        const vals = new Array();
        newSource.getFeatures().forEach((feat)=>{
          vals.push(feat.get(this.selectedIndex))
        })
      const obj = getAndSetClassesFromData(vals);
      WALK.setStyle(styleFnWalkGrids);
      this.dataLoaded = true;
      } 
    })
    this.zoomToSelCityExtent();
  }
  zoomToSelCityExtent = ():void => {
    this.map.getView().fit(this.selectedCity.getGeometry().getExtent(),{
     padding:[100,100,100,100],
      size:this.map.getSize(),
      duration: 2000
    });
 }

  getTitleFromMappingCode = (code:string):any[] => {
    return this.mappings.filter( (elem) => {
      return elem.Code === code;
    });
  }


}