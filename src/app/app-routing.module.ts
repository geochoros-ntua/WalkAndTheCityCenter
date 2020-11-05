import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-map', pathMatch: 'full'}, 
  { path: 'app-map', component: MapComponent },
  { path: 'about-us', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
