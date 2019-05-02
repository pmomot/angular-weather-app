import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CityWeatherForecastModel, CityWeatherModel } from '../../../shared/models';
import { trackByIndex } from '../../../shared/utils/track-by-index';

@Component({
  selector: 'wr-city-weather-card',
  styleUrls: ['./city-weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cwc-inner" [class.cwc-inner--back]="showBack">
      <div class="cwc-front" [style.background-image]="'url(' + cityWeather.imageSrc + ')'">
        <div class="cwc-row">
          <div class="cwc-row__text cwc-row__text--yellow">{{ cityWeather.avgTemperature }} ℃</div>
          <div class="cwc-row__text cwc-row__text--medium">{{ cityWeather.name }}</div>
        </div>
        <div class="cwc-row">
          <div class="cwc-row__text cwc-row__text--blue">{{ cityWeather.windSpeed }} meters/sec</div>
          <div class="cwc-row__text clickable" (click)="showMore()">More</div>
        </div>
      </div>
      <div class="cwc-back" [style.background-image]="'url(' + cityWeather.imageSrc + ')'">
        <ng-container *ngIf="cityWeatherForecast">
          <div
            class="cwc-column"
            *ngFor="let item of cityWeatherForecast.forecast; trackBy: trackByIndex"
          >
            <div class="cwc-row__text cwc-row__text--date">{{ item.ts | date: 'MMM d, HH:mm' }}</div>
            <div class="cwc-row">
              <div class="cwc-row__text cwc-row__text--yellow">{{ item.temperature }} ℃</div>
              <div class="cwc-row__text cwc-row__text--blue">{{ item.windSpeed }} meters/sec</div>
            </div>
          </div>
        </ng-container>
        <div class="cwc-row">
          <div></div>
          <div class="cwc-row__text clickable" (click)="showBack = !showBack">Less</div>
        </div>
      </div>
    </div>
  `
})
export class CityWeatherCardComponent {
  @Input() cityWeather: CityWeatherModel;
  @Input() cityWeatherForecast: CityWeatherForecastModel;
  @Output() loadMoreInfo = new EventEmitter<number>();
  readonly trackByIndex = trackByIndex;
  showBack = false;

  showMore () {
    this.showBack = true;
    this.loadMoreInfo.emit(this.cityWeather.id);
  }
}
