import { ChangeDetectionStrategy, Component } from '@angular/core';
import { trackByIndex } from '../../../shared/utils/track-by-index';

@Component({
  selector: 'wr-city-weather-skeleton',
  styleUrls: ['./city-weather-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cws-item">
      <div class="cws-row" *ngFor="let row of 2 | numberToArray; trackBy: trackByIndex">
        <div class="skeleton-block cws-row__text"></div>
        <div class="skeleton-block cws-row__text"></div>
      </div>
    </div>
  `
})
export class CityWeatherSkeletonComponent {
  readonly trackByIndex = trackByIndex;
}
