import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';


@Injectable({
  providedIn: 'root'
})
export class MapService {


  private map:Map;

  constructor() { }

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
    return this.map;
  }

  public getCurrentMap(){
    return this.map;
  }

  

}