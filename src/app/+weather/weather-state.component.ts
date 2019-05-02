import { ChangeDetectionStrategy, Component } from '@angular/core';

import { trackByIndex } from '../shared/utils/track-by-index';
import { WeatherFeatureService } from './services/weather-feature.service';
import { cityIdList } from './cities';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./weather-state.component.scss'],
  template: `
    <div class="ws-content">
      <ng-container *ngIf="loading$ | async; else groupWeather">
        <wr-city-weather-skeleton
          class="wr-card"
          *ngFor="let item of citiesLoadingAmount | numberToArray; trackBy: trackByIndex"
        ></wr-city-weather-skeleton>
      </ng-container>
    </div>
    <ng-template #groupWeather>
      <ng-container *ngIf="forecast$ | async as forecastMap">
        <wr-city-weather-card
          class="wr-card"
          *ngFor="let cityWeather of cities$ | async; trackBy: trackByIndex"
          [cityWeather]="cityWeather"
          [cityWeatherForecast]="forecastMap[cityWeather.id]"
          (loadMoreInfo)="getWeatherForecast($event)"
        ></wr-city-weather-card>
      </ng-container>
    </ng-template>
  `
})
export class WeatherStateComponent {
  readonly loading$ = this.weatherFeatureService.loading$;
  readonly cities$ = this.weatherFeatureService.cities$;
  readonly forecast$ = this.weatherFeatureService.forecast$;
  readonly citiesLoadingAmount = cityIdList.length;
  readonly trackByIndex = trackByIndex;

  constructor (private weatherFeatureService: WeatherFeatureService) {}

  getWeatherForecast (id: number) {
    this.weatherFeatureService.getWeatherForecast(id);
  }
}
