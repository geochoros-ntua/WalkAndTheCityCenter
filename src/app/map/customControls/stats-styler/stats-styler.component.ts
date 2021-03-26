import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapService } from '../../services/map.service';
import { StatsStylerModalComponent } from '../stats-styler-modal/stats-styler-modal.component';

@Component({
  selector: 'app-stats-styler',
  templateUrl: './stats-styler.component.html',
  styleUrls: ['./stats-styler.component.scss']
})
export class StatsStylerComponent implements OnInit {

  constructor(public dialog: MatDialog, public mapService: MapService) { }

  ngOnInit(): void {
  }

  openStyleDialog(): void {
    this.dialog.open(StatsStylerModalComponent,{
      position: {
        top: '5.0em',
        right: '14.5em',
      }});
  }
}
