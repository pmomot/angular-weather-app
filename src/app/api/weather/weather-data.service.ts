import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CityWeatherForecastResponse, GroupWeatherResponse } from './city-weather.interface';
import { ROUTES } from '../routes';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor (private http: HttpClient) {}

  getCityWeatherForecast (city: number) {
    return this.http.get<CityWeatherForecastResponse>(ROUTES.weatherCityForecast, {
      params: {
        id: String(city),
        units: 'metric'
      }
    });
  }

  getWeatherForGroup (cities: number[]) {
    return this.http.get<GroupWeatherResponse>(ROUTES.weatherGroup, {
      params: {
        id: cities.join(','),
        units: 'metric'
      }
    }).pipe(
      map(({list}) => list)
    );
  }
}
