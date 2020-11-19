import { Component,  OnInit } from '@angular/core';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  public featureClicked: Feature = null;
  private overlayPopup: Overlay;
  private displayedColumns: string[] = ['name', 'value'];

  constructor(private mapService:MapService) { 
    this.mapService.featureClicked$.subscribe((obj) => {
      if(obj){
        this.featureClicked = obj;
        this.mapService.getPopUpOverlay().setPosition(this.featureClicked.coord);
      }
  });
  }
  

  ngOnInit(): void {
    this.overlayPopup = new Overlay({
      id: 'popupoverlay',
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      }
    });
    this.mapService.getCurrentMap().addOverlay(this.overlayPopup);
  }

  public closeIt(){
    this.overlayPopup.setPosition(undefined);
  }

  public getValidKeys(keys:string[]):string[]{
    return keys.filter( el => ['OBJECTID','City','geometry','Shape_Area','Shape_Leng'].indexOf( el ) < 0);
  }

  public parseNumberKey(val){
    return parseFloat(val).toFixed(2);
  }


}
