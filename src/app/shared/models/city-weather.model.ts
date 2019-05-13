import { CityWeatherResponse } from '../../api/weather/city-weather.interface';

export type CityWeatherData = CityWeatherResponse;

export class CityWeatherModel {
  readonly id: number;
  readonly name: string;
  readonly avgTemperature: number;
  readonly windSpeed: number;
  readonly imageSrc: string;

  constructor (data: CityWeatherResponse) {
    this.id = data.id;
    this.name = data.name;
    this.avgTemperature = +((data.main.temp_min + data.main.temp_max) / 2).toFixed(1);
    this.windSpeed = data.wind.speed;
    this.imageSrc = `./assets/images/cities/${data.id}.jpg`;
  }
}
