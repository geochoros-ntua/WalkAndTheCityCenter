import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-zoominout',
  templateUrl: './zoominout.component.html',
  styleUrls: ['./zoominout.component.scss']
})
export class ZoominoutComponent implements OnInit {

  constructor(public mapService:MapService) { }

  ngOnInit(): void {

  }

  zoomIn():void{
    this.mapService.getCurrentMap().getView().animate({
      center: this.mapService.getCurrentMap().getView().getCenter(),
      zoom:   this.mapService.getCurrentMap().getView().getZoom() + 1
    });
  }
  zoomOut():void{
    this.mapService.getCurrentMap().getView().animate({
      center: this.mapService.getCurrentMap().getView().getCenter(),
      zoom:   this.mapService.getCurrentMap().getView().getZoom() - 1
    });
  }

}
