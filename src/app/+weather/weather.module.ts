import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { WeatherComponentsModule } from './components/weather-components.module';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherStateComponent } from './weather-state.component';

@NgModule({
  imports: [
    SharedModule,
    WeatherRoutingModule,
    WeatherComponentsModule
  ],
  declarations: [
    WeatherStateComponent
  ],
  exports: [
    WeatherStateComponent
  ]
})
export class WeatherModule {}
