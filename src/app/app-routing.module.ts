import { ChartComponent } from './chart/chart.component';
import { CitiesComponent } from './cities/cities.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'app-map', component: MapComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'app-help', component: HelpComponent },
  { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false,
    anchorScrolling: 'enabled', onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
