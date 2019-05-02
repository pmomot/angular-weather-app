import { Action } from '@ngrx/store';
import { Params } from '@angular/router';
import { CityWeatherData, CityWeatherForecastData } from '../../shared/models';

export enum CityActions {
  GetGroupWeather        = '[Get] Group Weather',
  GetGroupWeatherDone    = '[Get] Group Weather Done',
  GetGroupWeatherFailed  = '[Get] Group Weather Failed',
  GetCityForecast        = '[Get] City Forecast',
  GetCityForecastDone    = '[Get] City Forecast Done',
}

export class GetCityForecast implements Action {
  readonly type = CityActions.GetCityForecast;
  constructor (public payload: number) {}
}

export class GetCityForecastDone implements Action {
  readonly type = CityActions.GetCityForecastDone;
  constructor (public payload: CityWeatherForecastData) {}
}

export class GetGroupWeather implements Action {
  readonly type = CityActions.GetGroupWeather;
  constructor (public payload: Params) {}
}

export class GetGroupWeatherDone implements Action {
  readonly type = CityActions.GetGroupWeatherDone;
  constructor (public payload: CityWeatherData[]) {}
}

export class GetGroupWeatherFailed implements Action {
  readonly type = CityActions.GetGroupWeatherFailed;
  constructor (public payload: Error) {}
}

export type CityActionsUnion = GetCityForecast
  | GetCityForecastDone
  | GetGroupWeather
  | GetGroupWeatherDone
  | GetGroupWeatherFailed;
