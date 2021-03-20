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

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShareMapModalComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      
    });
  }
}
