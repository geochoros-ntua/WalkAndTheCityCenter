import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { MapStatsService } from '../../services/mapstats.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {


  constructor(
    public mapService: MapService, 
    public mapStatsService:MapStatsService) { 

  }

  ngOnInit(): void {
  }

  toggleLegend(): void{
    const res = this.mapService.getCurrentMap().getView().getResolution();
    if (res <= 50 && document.getElementById('legend').className === 'legendDivHide') {
      document.getElementById('btnlgnd').style.display = "none"
      document.getElementById('legend').className = 'legendDivShow';
    } else {
      document.getElementById('btnlgnd').style.display = "block"
      document.getElementById('legend').className = 'legendDivHide';
    }
  }
  
}
