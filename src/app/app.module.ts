import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle'; 
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatStepperModule} from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MapComponent } from './map/map.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './app.reuse.startegy';
import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
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
import { DownloadModalComponent } from './map/customControls/download-modal/download-modal.component';
import { CitiesComponent } from './cities/cities.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  imports:      [
     BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, FlexLayoutModule, BrowserAnimationsModule,
     MatIconModule, MatButtonModule, MatButtonToggleModule, MatSidenavModule, MatToolbarModule, MatSelectModule, MatSliderModule,
     MatMenuModule, MatProgressSpinnerModule, MatCardModule, MatTableModule,MatTooltipModule,MatListModule,MatGridListModule,
     MatProgressSpinnerModule, MatCardModule, MatTableModule,MatTooltipModule,
     MatDialogModule, MatStepperModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, HttpClientModule, MatExpansionModule
   ],
  declarations: [ 
    AppComponent, MapComponent, AboutUsComponent, 
    HomeComponent, TileselectorComponent, IndexselectorComponent, 
    PopupComponent, OpacitySliderComponent, HelpComponent, DownloaderComponent, WorldzoomComponent, ZoominoutComponent, LegendComponent, DownloadModalComponent, CitiesComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{
    provide: [RouteReuseStrategy, MatDialogRef],
    useClass: CustomReuseStrategy
  }],
})
export class AppModule { }
