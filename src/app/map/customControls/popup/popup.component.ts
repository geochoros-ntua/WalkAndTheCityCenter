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

  public closeIt(): void{
    this.overlayPopup.setPosition(undefined);
  }

  public getValidKeys(keys:string[]):string[]{
    let validKeys = keys.filter( el => ['OBJECTID','City','geometry','Shape_Area','Shape_Leng'].indexOf( el ) < 0);
    const fromIndex = validKeys.findIndex( el => el === this.mapService.selectedIndex);
    validKeys = this.swapElements(validKeys, fromIndex, 0);
    return validKeys;
  }

  public parseNumberKey(val): string {
    return parseFloat(val).toFixed(2);
  }

  private swapElements(arr: any[], fromIndex: number, toIndex: number): any[] {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
}


}
