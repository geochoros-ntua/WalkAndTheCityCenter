import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import { Vector } from 'ol/source';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import GeoJSON from 'ol/format/GeoJSON';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olExtent from 'ol/extent';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import {Control, defaults as defaultControls} from 'ol/control'; 
import Overlay from 'ol/Overlay';
import {initOSMLayer, initGOSMLayer,initCityBoundsLayer,
  initWalkabilityLayer,switchTileLayer,setSelIndex,
  getAndSetClassesFromData,styleFnWalkGrids,highlightStyle} from './map.helper';
import {setSelIndexDownCntlr} from './customControls/downloadControl';

import {legendControl} from './customControls/legendControl';
import {zoomToWorldControl} from './customControls/zoomToWorldControl';
import {downloadControl} from './customControls/downloadControl';

// ng build --prod --base-href /walkandthecitycenter/

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  

  constructor() { }

  title = 'ol3-ng';
  datadir: string;
  dataLoaded:boolean;
  map: any;
  popupCloser: any;
  this_:MapComponent;

  OSM: TileLayer;
  GOSM: TileLayer;
  CITY_BNDS: VectorLayer;
  WALK: VectorLayer;

  overlayPopup:Overlay;
  selectedCity:Feature;
  hoveredCity:Feature;
  selectedIndex:string;
  mappings:any;
  walkOpacity:number;



  ngOnInit(){
    this.datadir = '/walkandthecitycenter';
    //this.datadir = '';
    this.mappings = require('../../assets/geodata/lookup.json').lookups;
    this.OSM = initOSMLayer();
    this.GOSM = initGOSMLayer();
    this.CITY_BNDS = initCityBoundsLayer(this.datadir);
    this.WALK = initWalkabilityLayer();
    this.selectedIndex ="Score";
    this.popupCloser = document.getElementById('popup-closer');
    this.dataLoaded = true;
    this.hoveredCity = null;
    this.selectedCity = null;
    this.walkOpacity = 70;
       
   
    const this_ = this;
    const layers = [this.OSM, this.GOSM, this.WALK, this.CITY_BNDS];
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


    this.map = new Map({
      target: 'walk_map',
      layers: layers,
      overlays: [this.overlayPopup],
      controls: defaultControls({attribution : false}).extend([
        new legendControl(), 
        new zoomToWorldControl(),
        new downloadControl()
      ]),
      view: new View({
        center: olProj.fromLonLat([15.0785, 51.4614]),
        zoom: 1
      })
    });

    this.CITY_BNDS.once('change', (evt) => {
      this_.zoomToCities();
    })
    

    this.map.on('click', (event) => {
      this_.overlayPopup.setPosition(undefined);
      this_.map.forEachFeatureAtPixel(event.pixel, (feature,layer) => {
        if (layer.get("title")==="WALK"){
          const keys = feature.getKeys();
          let attrsTable ='<table>';
          for (let i = 0; i < keys.length; i++){
            if (keys[i]!=='geometry'){
              if (this_.getTitleFromMappingCode(keys[i]).length ===1){
                attrsTable += '<tr><td>'+this_.getTitleFromMappingCode(keys[i])[0].indiname+':</td><td>'+parseFloat(feature.get(keys[i])).toFixed(2)+'</td></tr>';
              } else {
                attrsTable += '<tr><td>'+keys[i]+':</td><td>'+feature.get(keys[i])+'</td></tr>';
              }
            }
          }
          attrsTable += '</table>';
          var coordinate = event.coordinate;
          document.getElementById('popup-content').innerHTML = attrsTable;
          this_.overlayPopup.setPosition(coordinate);
          return;
        } else if (layer.get("title")==="CITY_BNDS") {
          if (this_.selectedCity){
            this_.selectedCity.setStyle(undefined);
          }
          this_.selectedCity = feature;
          this_.selectedCity.setStyle(highlightStyle)
          this_.loadAndZoomToCity(false);
          this_.overlayPopup.setPosition(undefined);
        } else {
          this_.overlayPopup.setPosition(undefined);
        }
      });
  });


  this.map.on('pointermove', (e) => {
    const pixel = this_.map.getEventPixel(e.originalEvent);
    const hit = this_.map.hasFeatureAtPixel(pixel);
    this_.map.getViewport().style.cursor = hit ? 'pointer' : '';
   
    if (this.hoveredCity){
      if (this.selectedCity !== this.hoveredCity){
        this.hoveredCity.setStyle(undefined);
        this.hoveredCity = null;
      }
    } 
    this_.map.forEachFeatureAtPixel(e.pixel,(f,layer) => {
        this.hoveredCity = f;
        this.hoveredCity.setStyle(highlightStyle);
        return true;
    },{
      layerFilter : (lyr) => {
        return lyr.get('title') === 'CITY_BNDS';
      }
    });
  });

  }

  setDisplayIndex = (val:string): void =>{   
    this.dataLoaded = false; 
    this.overlayPopup.setPosition(undefined); 
    this.selectedIndex = val;
    setSelIndex(val);
    setSelIndexDownCntlr(val);
    const vals = new Array();
    this.WALK.getSource().getFeatures().forEach((feat)=>{
        vals.push(feat.get(this.selectedIndex))
        })
    getAndSetClassesFromData(vals);
    if (vals.length === 0){
      this.dataLoaded = true; 
    }
    let this_ = this;
    this.WALK.getSource().refresh();
    this.WALK.getSource().once('change', (e) => {
      if (this_.WALK.getSource().getState() == 'ready') {
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

  loadAndZoomToCity = (download:boolean):void => {
    this.dataLoaded = false; 
    const newSource = new Vector({
      format: new GeoJSON({
        defaultDataProjection:'EPSG:3857',
        featureProjection:'EPSG:3857',
        geometryName:'geometry'
      }),
      url: '../..'+this.datadir+'/assets/geodata/'+this.selectedCity.get('City').toLowerCase() +'.json',
      wrapX:false
    })
    this.WALK.getSource().clear();
    this.WALK.setSource(newSource);
    this.WALK.getSource().refresh();
    console.log('newSource.getState()',newSource.getState())
    newSource.once('change', (e) => {
      if (newSource.getState() == 'ready') {
        const vals = new Array();
        newSource.getFeatures().forEach((feat)=>{
          vals.push(feat.get(this.selectedIndex))
        })
      getAndSetClassesFromData(vals);
      this.WALK.setStyle(styleFnWalkGrids);
      this.dataLoaded = true;
      }
    })
    this.zoomToSelCityExtent();
  }

  setTileLayer = (val:string): void =>{     
    switchTileLayer(val, this.OSM, this.GOSM);
  }
 

  getTitleFromMappingCode = (code:string):any[] => {
    return this.mappings.filter( (elem) => {
      return elem.Code === code;
    });
  }

  zoomToCities = ():void => {
    this.map.getView().fit(
      this.CITY_BNDS.getSource().getExtent(),{
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
    this.WALK.setOpacity(this.walkOpacity/100);
    
  }
}