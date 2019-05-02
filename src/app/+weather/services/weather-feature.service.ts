import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { CityWeatherForecastModel, CityWeatherModel } from '../../shared/models';
import { RootState } from '../../state';
import { selectWeatherForecast, selectGroupWeather, selectGroupWeatherLoading } from '../../state/city/city.reducer';
import { GetCityForecast } from '../../state/city/city.actions';

@Injectable({
  providedIn: 'root'
})
export class WeatherFeatureService {
  readonly loading$ = this.store.pipe(
    select(selectGroupWeatherLoading),
    shareReplay(1)
  );
  readonly cities$ = this.store.pipe(
    select(selectGroupWeather),
    map(cities => cities.map(cityWeather => new CityWeatherModel(cityWeather)))
  );
  readonly forecast$ = this.store.pipe(
    select(selectWeatherForecast),
    map(list => list.map(item => new CityWeatherForecastModel(item))),
    map(list => list.reduce((reducedMap, item) => {
      reducedMap[item.id] = item;
      return reducedMap;
    }, {}))
  );

  constructor (private store: Store<RootState>) {}

  getWeatherForecast (id: number) {
    this.store.dispatch(new GetCityForecast(id));
  }
}
