import { Component, OnInit } from '@angular/core';
import Overlay from 'ol/Overlay';
import { MapService } from '../../map.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  popupCloser: HTMLElement;
  overlayPopup: any;

  constructor(private mapService:MapService) { }

  ngOnInit(): void {
    this.popupCloser = document.getElementById('popup-closer');
    const this_ = this;

    this.overlayPopup = new Overlay({
      id: 'popupoverlay',
      element: document.getElementById('popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      }
    });
    this.popupCloser.onclick = ():boolean => {
      this_.overlayPopup.setPosition(undefined);
      this_.popupCloser.blur();
      return false;
    };
    this.mapService.getCurrentMap().addOverlay(this.overlayPopup);
  }


}
