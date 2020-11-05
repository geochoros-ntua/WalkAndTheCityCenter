import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  getAndSetClassesFromData,styleFnWalkGrids} from './map.helper';

import {legendControl} from './customControls/legendControl';
import {zoomToWorldControl} from './customControls/zoomToWorldControl';

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


  overlayMenu:Overlay;
  overlayPopup:Overlay;
  selectedCity:Feature;
  selectedIndex:string;
  mappings:any;



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
       
   
    
    const this_ = this;
    const layers = [this.OSM, this.GOSM, this.WALK, this.CITY_BNDS];
    this.overlayPopup = new Overlay({
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.popupCloser.onclick = function () {
      this_.overlayPopup.setPosition(undefined);
      this_.popupCloser.blur();
      return false;
    };

    this.overlayMenu = new Overlay({
      element: document.getElementById('vert-menu'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    this.map = new Map({
      target: 'walk_map',
      layers: layers,
      overlays: [this.overlayMenu,this.overlayPopup],
      controls: defaultControls({attribution : false}).extend([new legendControl(), new zoomToWorldControl()]),
      view: new View({
        center: olProj.fromLonLat([15.0785, 51.4614]),
        zoom: 1
      })
    });

    this.CITY_BNDS.once('change', function (evt) {
      this_.zoomToCities();
    })
    

    this.map.on('click', (event) => {
      this_.overlayPopup.setPosition(undefined);
      this_.overlayMenu.setPosition(undefined);
      this_.map.forEachFeatureAtPixel(event.pixel, function(feature,layer) {
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
          // var hdms = toStringHDMS(toLonLat(coordinate));

          document.getElementById('popup-content').innerHTML = attrsTable;
          this_.overlayPopup.setPosition(coordinate);
      } else {
        this_.overlayPopup.setPosition(undefined);
      }});
  });

  this.map.getViewport().addEventListener('contextmenu', (evt) => {
    evt.preventDefault();
    this_.overlayMenu.setPosition(undefined);
    const pix = this_.map.getPixelFromCoordinate(this_.map.getEventCoordinate(evt));
        this_.map.forEachFeatureAtPixel(pix, function(feature,layer) {
          if (layer.get("title")==="CITY_BNDS"){
            this_.selectedCity = feature;
            document.getElementById('vert-menu-title').innerHTML = feature.get('City');
            this_.overlayMenu.setPosition(this_.map.getEventCoordinate(evt));
        }});
    
    })

  this.map.on('pointermove', function(e){
    var pixel = this_.map.getEventPixel(e.originalEvent);
    var hit = this_.map.hasFeatureAtPixel(pixel);
    this_.map.getViewport().style.cursor = hit ? 'pointer' : '';
  });

  }

  setDisplayIndex = (val:string): void =>{   
    this.dataLoaded = false; 
    this.overlayPopup.setPosition(undefined); 
    this.selectedIndex = val;
    setSelIndex(val);
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

  downloadDisplayData = ():void =>{
    this.loadAndZoomToCity(true);
  }


  zoomToSelCityExtent = ():void => {
     this.map.getView().fit(this.selectedCity.getGeometry().getExtent(),{
      padding:[100,100,100,100],
       size:this.map.getSize(),
       duration: 2000
     });
     this.overlayMenu.setPosition(undefined);
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
     // strategy: ol.loadingstrategy.bbox
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


      const objSerAndCols = getAndSetClassesFromData(vals);
      this.WALK.setStyle(styleFnWalkGrids);
      this.dataLoaded = true;
      //this.WALK.getSource().refresh();
       
      
      if (download){
        const feats = newSource.getFeatures();
        let parsedFeats = [];
        feats.forEach(feat => {
          const inFeat = new Feature();
          inFeat.setGeometry(feat.getGeometry());
          inFeat.set(this.selectedIndex,feat.get(this.selectedIndex));
          parsedFeats.push(inFeat);
        });
        const format = new GeoJSON({
          defaultDataProjection:'EPSG:3857',
          featureProjection:'EPSG:3857',
          geometryName:'geometry'
        });
        const data =  format.writeFeatures(parsedFeats);
        var sJson = JSON.stringify(data);
        var element = document.createElement('a');
        element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(JSON.parse(sJson)));
        element.setAttribute('download', "walkhub-data.geojson");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click(); // simulate click
        document.body.removeChild(element);
      }
      }
    })
    
    this.zoomToSelCityExtent();
  }

  setTileLayer = (val:string): void =>{     
    switchTileLayer(val, this.OSM, this.GOSM);
  }
 

  getTitleFromMappingCode = (code:string) => {
    return this.mappings.filter( (elem) => {
      return elem.Code === code;
    });
  }

  zoomToCities = () => {
    this.map.getView().fit(
      this.CITY_BNDS.getSource().getExtent(),{
      padding:[100,100,100,100],
       size:this.map.getSize(),
       duration: 2000
     });
  }
}