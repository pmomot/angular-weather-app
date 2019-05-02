import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CityActions, GetCityForecastDone, GetGroupWeatherDone, GetGroupWeatherFailed } from './city.actions';
import { WeatherDataService } from '../../api/weather/weather-data.service';

@Injectable()
export class CityEffects {

  @Effect()
  weather$ = this.actions$.pipe(
    ofType(CityActions.GetGroupWeather),
    switchMap(({payload}) =>
      timer(2000).pipe( // to show skeleton loading
        switchMap(() =>
          this.weatherDataService.getWeatherForGroup(payload).pipe(
            map(data => new GetGroupWeatherDone(data)),
            catchError(error => of(new GetGroupWeatherFailed(error)))
          )
        )
      )
    )
  );

  @Effect()
  forecast$ = this.actions$.pipe(
    ofType(CityActions.GetCityForecast),
    switchMap(({payload}) =>
      this.weatherDataService.getCityWeatherForecast(payload).pipe(
        map(data => new GetCityForecastDone(data))
      )
    )
  );

  constructor (
    private actions$: Actions,
    private weatherDataService: WeatherDataService
  ) {}
}
