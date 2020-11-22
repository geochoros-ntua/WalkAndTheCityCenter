import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MapComponent } from './map/map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './app.reuse.startegy';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
//import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TileselectorComponent } from './map/customControls/tileselector/tileselector.component';
import { IndexselectorComponent } from './map/customControls/indexselector/indexselector.component';
import { PopupComponent } from './map/customControls/popup/popup.component';
import { OpacitySliderComponent } from './map/customControls/opacity-slider/opacity-slider.component';
import { HelpComponent } from './help/help.component';
import { DownloaderComponent } from './map/customControls/downloader/downloader.component';
import { WorldzoomComponent } from './map/customControls/worldzoom/worldzoom.component';
import { ZoominoutComponent } from './map/customControls/zoominout/zoominout.component';
import { LegendComponent } from './map/customControls/legend/legend.component';

@NgModule({
  imports:      [
     BrowserModule, AppRoutingModule, FormsModule, FlexLayoutModule, BrowserAnimationsModule,
     MatIconModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatSelectModule, MatSliderModule,
     MatMenuModule, MatProgressSpinnerModule, MatCardModule, MatTableModule,MatTooltipModule
   ],
  declarations: [ 
    AppComponent, MapComponent, AboutUsComponent, 
    HomeComponent, TileselectorComponent, IndexselectorComponent, 
    PopupComponent, OpacitySliderComponent, HelpComponent, DownloaderComponent, WorldzoomComponent, ZoominoutComponent, LegendComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{
    provide: RouteReuseStrategy,
    useClass: CustomReuseStrategy
  }],
})
export class AppModule { }
