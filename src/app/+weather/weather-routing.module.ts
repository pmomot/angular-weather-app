import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherStateComponent } from './weather-state.component';
import { WeatherDataResolver } from './resolvers/weather-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: WeatherStateComponent,
    resolve: [
      WeatherDataResolver
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [WeatherDataResolver]
})
export class WeatherRoutingModule {}
