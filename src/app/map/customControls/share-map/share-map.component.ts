import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapService } from '../../services/map.service';
import { ShareMapModalComponent } from '../share-map-modal/share-map-modal.component';

@Component({
  selector: 'app-share-map',
  templateUrl: './share-map.component.html',
  styleUrls: ['./share-map.component.scss']
})
export class ShareMapComponent implements OnInit {

  constructor(public dialog: MatDialog, public mapService: MapService) { }

  ngOnInit(): void {

  }

  openDialog(): void {
    this.dialog.open(ShareMapModalComponent);
  }
}
