import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import { MapService } from '../../services/map.service';
import { MapLayersService } from '../../services/maplayers.service';
import { DownloadModalComponent } from '../download-modal/download-modal.component';

@Component({
  selector: 'app-downloader',
  templateUrl: './downloader.component.html',
  styleUrls: ['./downloader.component.scss']
})
export class DownloaderComponent implements OnInit {

@Input() selectedIndex:string;

  constructor(
    public mapService:MapService, 
    private mapLayersService:MapLayersService,
    public dialog: MatDialog) { }

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
    element.click();
    document.body.removeChild(element);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DownloadModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      
    });
  }
}
