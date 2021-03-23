import { Injectable } from '@angular/core';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import geostats from 'geostats/lib/geostats'
import chroma from 'chroma-js'
import { ClassRange } from '../api/map.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MapStatsService {
    public selectedIndex: string = 'Score';
    public classSeries: any;
    public classColors: string[];
    public numOfClasses: number;
    public statMethod: string;
    public statMethods : string[];
    public statMethodsLabels : string[];
    public classRanges: ClassRange[]

    constructor() {
      this.numOfClasses = 10;
      this.statMethod = 'method_Q';
      this.statMethods = [
        'method_EI', 'method_Q', 'method_JENKS', 'method_SD', 'method_AP',  'method_GP'
      ];
      this.statMethodsLabels = [
        'Equal Interval',
        'Quantile',
        'Jenks',
        'Standard Deviation',
        'Arithmetic Progression',
        'Geometric Progression'
      ];
    }

    public getLabelFormVal(val: string): string {
      return this.statMethodsLabels[this.statMethods.findIndex( m => m === val)];
    }

    public getAndSetClassesFromData(data):void{
        if (data.length>0){
            data = data.map( val => parseFloat(val.toFixed(4)));
            const serie = new geostats(data);
            switch (this.statMethod) {
              case 'method_EI':
                serie.getClassEqInterval(this.numOfClasses);
                this.setUpSeriesAndColors(serie);
                break;
              case 'method_Q':
                serie.getClassQuantile(this.numOfClasses);
                this.setUpSeriesAndColors(serie);
                break;
              case 'method_SD':
                serie.getClassStdDeviation(this.numOfClasses);
                this.setUpSeriesAndColors(serie);
                break;
              case 'method_AP':
                serie.getClassArithmeticProgression(this.numOfClasses);
                this.setUpSeriesAndColors(serie);
                break;
              case 'method_JENKS':
                serie.getClassJenks(this.numOfClasses);
                this.setUpSeriesAndColors(serie);
                break;
              case 'method_GP':
                serie.getClassGeometricProgression(this.numOfClasses);
                this.setUpSeriesAndColors(serie);
                break;
              default:
                console.log('no bloody way!!!!')  
            }
           
        }
    }

    private setUpSeriesAndColors(serie){
      const colors = chroma.scale([[253, 231, 37, 1],[30, 158, 137, 1], [68, 1, 84, 1]]).colors(this.numOfClasses);
      serie.setColors(colors);
      serie.doCount();
      this.classSeries = serie;
      this.classColors = colors;
    }


    public styleFnWalkGrids = (feature:Feature, resolution:number): Style => {
        const currVal = parseFloat(feature.get(this.selectedIndex));
        const bounds = this.classSeries.bounds;
        this.classRanges = []
        for (let i = 0; i < bounds.length-1; i++) { 
          this.classRanges.push({
            min: parseFloat(bounds[i].toFixed(4)),
            max: parseFloat(bounds[i+1].toFixed(4))
          });  
        }  
        const classIndex = this.verifyClassFromVal(this.classRanges, currVal);
        const polyStyleConfig: Style = {
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
        let valRound = parseFloat(val.toFixed(4))
        for (let i = 0; i < rangevals.length; i++) {
          if (valRound >= rangevals[i].min && valRound <= rangevals[i].max) {
            retIndex = i;
          } 
        }
        return retIndex;
      }
   
}