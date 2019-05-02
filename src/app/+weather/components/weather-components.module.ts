import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CityWeatherCardComponent } from './city-weather-card/city-weather-card.component';
import { CityWeatherSkeletonComponent } from './city-weather-skeleton/city-weather-skeleton.component';

const components = [
  CityWeatherCardComponent,
  CityWeatherSkeletonComponent
];

@NgModule({
  imports: [SharedModule],
  declarations: components,
  exports: components
})
export class WeatherComponentsModule {}
