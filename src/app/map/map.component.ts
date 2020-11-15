import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import * as olProj from 'ol/proj';
import proj4 from 'proj4';
import TileLayer from 'ol/layer/Tile';
import {defaults as defaultControls} from 'ol/control'; 
import Overlay from 'ol/Overlay';
import {setSelIndex,
  getAndSetClassesFromData,styleFnWalkGrids,highlightStyle} from './map.helper';
import {setSelIndexDownCntlr} from './customControls/downloadControl';
import { MapService } from './map.service';

import {legendControl} from './customControls/legendControl';
import {zoomToWorldControl} from './customControls/zoomToWorldControl';
import {downloadControl} from './customControls/downloadControl';
import {zoomInOutControl} from './customControls/zooomInOutControl';
import mappingsData from '../../assets/geodata/lookup.json';
import { MapLayersService } from './maplayers.service';

// ng build --prod --base-href /walkandthecitycenter/

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  

  constructor(
    private mapService: MapService, 
    private mapLayersService:MapLayersService) { }

  title = 'ol3-ng';
  dataLoaded:boolean;
  map: Map;
  popupCloser: any;
  this_:MapComponent;

  overlayPopup:Overlay;
  selectedCity:Feature;
  hoveredCity:Feature;
  selectedIndex:string;
  mappings:any = mappingsData.lookups;
  walkOpacity:number;



  ngOnInit(){
    
    this.selectedIndex ="Score";
    this.popupCloser = document.getElementById('popup-closer');
    this.dataLoaded = true;
    this.hoveredCity = null;
    this.selectedCity = null;
    this.walkOpacity = 70;
       
    proj4.defs('urn:ogc:def:crs:EPSG::3857', proj4.defs('EPSG:3857'));
   
    const this_ = this;
    const layers = [
      this.mapLayersService.initOSMLayer(), 
      this.mapLayersService.initGOSMLayer(), 
      this.mapLayersService.initWalkabilityLayer(),
       this.mapLayersService.initCityBoundsLayer()
      ];
    this.overlayPopup = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.popupCloser.onclick = ():boolean => {
      this_.overlayPopup.setPosition(undefined);
      this_.popupCloser.blur();
      return false;
    };

    this.map = this.mapService.createMap('walk_map');
    layers.forEach((lyr) => {
      this.map.addLayer(lyr);
    });
    this.map.addOverlay(this.overlayPopup);
    this.map.addControl(new legendControl());
    this.map.addControl(new zoomToWorldControl());
    this.map.addControl(new downloadControl());
    this.map.addControl(new zoomInOutControl());

    

    this.mapLayersService.getWalkabilityLayer().once('change', () => {
      this_.zoomToCities();
      this_.map.updateSize();
    })
    
    
    this.map.on('click', (event) => {
      this_.overlayPopup.setPosition(undefined);
      this_.map.forEachFeatureAtPixel(event.pixel, (feature,layer) => {
        if (layer.get("title")==="WALK"){
          const keys = feature.getKeys();
          let attrsTable ='<table class="mat-table  cdk-table"><tbody>';
          keys.filter( el => ['OBJECTID','geometry','Shape_Area','Shape_Leng'].indexOf( el ) < 0).forEach(key => {
              if (this_.getTitleFromMappingCode(key).length ===1){
                attrsTable += '<tr class="mat-row"><td class="mat-cell">'+this_.getTitleFromMappingCode(key)[0].indiname+':</td><td>'+parseFloat(feature.get(key)).toFixed(2)+'</td></tr>';
              } else {
                attrsTable += '<tr class="mat-row"><td class="mat-cell">'+key+':</td><td>'+feature.get(key)+'</td></tr>';
              }
          });
          attrsTable += '</tbody></table>';
          document.getElementById('popup-content').innerHTML = attrsTable;
          this_.overlayPopup.setPosition(event.coordinate);
          return;
        } else if (layer.get("title")==="CITY_BNDS") {
          if (this_.selectedCity){
            this_.selectedCity.setStyle(undefined);
          }
          this_.selectedCity = feature;
          this_.selectedCity.setStyle(highlightStyle)
          this_.loadAndZoomToCity();
          this_.overlayPopup.setPosition(undefined);
        } else {
          this_.overlayPopup.setPosition(undefined);
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

  setDisplayIndex = (val:string): void =>{   
    this.dataLoaded = false; 
    this.overlayPopup.setPosition(undefined); 
    this.selectedIndex = val;
    setSelIndex(val);
    setSelIndexDownCntlr(val);
    const vals = new Array();
    this.mapLayersService.getWalkabilityLayer().getSource().getFeatures().forEach((feat)=>{
        vals.push(feat.get(this.selectedIndex))
        })
    getAndSetClassesFromData(vals);
    if (vals.length === 0){
      this.dataLoaded = true; 
    }
    let this_ = this;
    this.mapLayersService.getWalkabilityLayer().getSource().refresh();
    this.mapLayersService.getWalkabilityLayer().getSource().once('change', () => {
      if (this_.mapLayersService.getWalkabilityLayer().getSource().getState() == 'ready') {
        this.dataLoaded = true; 
      }
    });
    
  }

  zoomToSelCityExtent = ():void => {
     this.map.getView().fit(this.selectedCity.getGeometry().getExtent(),{
      padding:[100,100,100,100],
       size:this.map.getSize(),
       duration: 2000
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
    const WALK = this.mapLayersService.getWalkabilityLayer()
    WALK.getSource().clear();
    WALK.setSource(newSource);
    WALK.getSource().refresh();
    newSource.once('change', () => {
      if (newSource.getState() == 'ready') {
        const vals = new Array();
        newSource.getFeatures().forEach((feat)=>{
          vals.push(feat.get(this.selectedIndex))
        })
      getAndSetClassesFromData(vals);
      WALK.setStyle(styleFnWalkGrids);
      this.dataLoaded = true;
      }
    })
    this.zoomToSelCityExtent();
  }


  getTitleFromMappingCode = (code:string):any[] => {
    return this.mappings.filter( (elem) => {
      return elem.Code === code;
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

  showSelector = ():boolean =>{
    if (this.dataLoaded && this.map.getView().getResolution()<=50){
      return true;
    } else {
      return false;
    }

  }

  setLyrOpacity = (event):void => {
    this.walkOpacity = event.value;
    this.mapLayersService.getWalkabilityLayer().setOpacity(this.walkOpacity/100);
    
  }
}