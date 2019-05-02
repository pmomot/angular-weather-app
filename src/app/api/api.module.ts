import { ModuleWithProviders, NgModule } from '@angular/core';

import { WeatherDataService } from './weather/weather-data.service';

@NgModule({})
export class ApiModule {
  static forRoot (): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        WeatherDataService
      ]
    };
  }
}
