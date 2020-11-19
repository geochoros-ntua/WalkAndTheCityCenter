import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../../map.service';
import { MapLayersService } from '../../maplayers.service';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.scss']
})
export class DownloaderComponent implements OnInit {
@Input()selectedIndex:string;
  constructor(public mapService:MapService, private mapLayersService:MapLayersService) { }

  ngOnInit(): void {
  }

  downloadData():void{
    const walkLyr = this.mapLayersService.getWalkabilityLayer();
      if (walkLyr) {
          const feats = walkLyr.getSource().getFeatures();
          if (feats.length>0){
            let parsedFeats = [];
            feats.forEach(feat => {
                const inFeat = new Feature();
                inFeat.setGeometry(feat.getGeometry());
                inFeat.set(this.selectedIndex, feat.get(this.selectedIndex));
                parsedFeats.push(inFeat);
            });
            const format = new GeoJSON({
              defaultDataProjection:'EPSG:3857',
              featureProjection:'EPSG:3857',
              geometryName:'geometry'
            });
            this.executeDownload(format.writeFeatures(parsedFeats))
          }
        }
  }

  executeDownload(data:string):void{
    const sJson = JSON.stringify(data);
    let element = document.createElement('a');
    element.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(JSON.parse(sJson)));
    element.setAttribute('download', "walkhub-data.geojson");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click(); // simulate click
    document.body.removeChild(element);
  }

}
