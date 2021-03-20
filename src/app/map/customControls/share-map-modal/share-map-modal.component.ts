import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Clipboard } from "@angular/cdk/clipboard";
import * as olProj from 'ol/proj';


@Component({
  selector: 'app-share-map-modal',
  templateUrl: './share-map-modal.component.html',
  styleUrls: ['./share-map-modal.component.scss']
})
export class ShareMapModalComponent implements OnInit {
  public _selectedCity: string = '';
  public _selectedIndex: string = '';
  public _selectedIndexTitle: string = '';
  public currentZoomLevel: number = 1;
  public currentCenter: string = '15.0785, 51.4614';

  constructor(public mapService: MapService, private clipboard: Clipboard ) { }

  ngOnInit(): void {
    this._selectedCity = this.mapService.selectedCity?.get('City');
    this._selectedIndex = this.mapService.selectedIndex;
    this._selectedIndexTitle = this.mapService.getTitleFromMappingCode(this._selectedIndex);
    console.log('this.selectedIndex', this._selectedIndex, this._selectedIndexTitle)
    this.currentCenter = olProj.toLonLat(this.mapService.getCurrentMap().getView().getCenter()).join(',');
    this.currentZoomLevel = this.mapService.getCurrentMap().getView().getZoom();
  }

  public copyInputMessage(message){
    this.clipboard.copy(message.value);
  }

  

}
