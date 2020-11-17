import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MapService } from '../../map.service';
import mappingsData from '../../../../assets/geodata/lookup.json';
import { MapLayersService } from '../../maplayers.service';
import { setSelIndex, getAndSetClassesFromData } from '../../map.helper';
import {setSelIndexDownCntlr} from '../../customControls/downloadControl';

@Component({
  selector: 'app-indexselector',
  templateUrl: './indexselector.component.html',
  styleUrls: ['./indexselector.component.scss']
})
export class IndexselectorComponent implements OnInit {
  @Input() dataLoaded: boolean;
  @Output() selectedIndex$:EventEmitter<string> = new EventEmitter<string>();
  selectedIndex:string;
  

  private mappings:any = mappingsData.lookups;
  
  constructor(private mapService:MapService,private mapLayersService:MapLayersService) { }

  ngOnInit(): void {
    
    this.selectedIndex$.subscribe(
      sel => this.selectedIndex = sel
      );
    this.selectedIndex$.emit("Score");
  }

  public showSelector = ():boolean =>{
    if (this.dataLoaded && this.mapService.getCurrentMap().getView().getResolution()<=50){
      return true;
    } else {
      return false;
    }

  }


  setDisplayIndex = (val:string): void =>{   
    this.dataLoaded = false;  
    this.mapService.getPopUpOverlay().setPosition(undefined);
    this.selectedIndex$.emit(val);
    setSelIndex(val);
    setSelIndexDownCntlr(val);
    const vals = new Array();
    this.mapLayersService.getWalkabilityLayer().getSource().getFeatures().forEach((feat)=>{
        vals.push(feat.get(val))
        })
    getAndSetClassesFromData(vals);
    if (vals.length === 0){
      this.dataLoaded = true; 
    }
    let this_ = this;
    this.mapLayersService.getWalkabilityLayer().getSource().refresh();
    this.mapLayersService.getWalkabilityLayer().getSource().once('change', () => {
      if (this_.mapLayersService.getWalkabilityLayer().getSource().getState() == 'ready') {
        this.dataLoaded = true; 
      }
    });
    
  }
}
