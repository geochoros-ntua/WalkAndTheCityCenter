import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import geostats from 'geostats/lib/geostats'
import chroma from 'chroma-js'

@Injectable({
  providedIn: 'root'
})
export class MapStatsService {
    public selectedIndex:string = 'Score';
    public classSeries:any;
    public classColors:any[];
    constructor() {

    }

    public getAndSetClassesFromData(data):void{
        if (data.length>0){
            data = data.map(val => {
            return Number(val.toFixed(4));
            });
            let serie = new geostats(data);
            serie.getClassQuantile(10);
            let colors = chroma.scale([[253, 231, 37, 1],[30, 158, 137, 1], [68, 1, 84, 1]]).colors(10);
            serie.setColors(colors);
            serie.doCount();
            this.classSeries = serie;
            this.classColors = colors;
        }
    }


    public styleFnWalkGrids = (feature:Feature, resolution:number): Style => {
        console.log('styleFnWalkGrids index',this.selectedIndex)
        const currVal = parseFloat(feature.get(this.selectedIndex));
        const bounds = this.classSeries.bounds;
        let numRanges = new Array();
        for (let i = 0; i < bounds.length-1; i++) { 
        numRanges.push({
            min: parseFloat(bounds[i]),
            max: parseFloat(bounds[i+1])
          });  
        }  
        var classIndex = this.verifyClassFromVal(numRanges, currVal);
        var polyStyleConfig = {
          stroke: new Stroke({
            color: [255, 255, 0, 0],
            width: 0
          }),
          fill: new Fill({
            color: this.classColors[classIndex]
          }),
        };
      return new Style(polyStyleConfig);
      }
      
      public verifyClassFromVal = (rangevals, val) => {
        let retIndex = -1;
        let valRound = Number(val.toFixed(4))
        for (let i = 0; i < rangevals.length; i++) {
          if (valRound >= rangevals[i].min && valRound <= rangevals[i].max) {
            retIndex = i;
          } 
        }
        return retIndex;
      }
   
}