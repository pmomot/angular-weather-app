import {
  CityWeatherForecastListItemResponse,
  CityWeatherForecastResponse
} from '../../api/weather/city-weather.interface';

export type CityWeatherForecastData = CityWeatherForecastResponse;

export class CityWeatherForecastModel {
  private readonly forecastItemsCount = 3;
  readonly id: number;
  readonly forecast: {temperature: number, windSpeed: number, ts: Date}[];

  constructor (data: CityWeatherForecastResponse) {
    this.id = data.city.id;
    this.forecast = this.prepareForecast(data.list);
  }

  private prepareForecast (list: CityWeatherForecastListItemResponse[]) {
    // needed to filter out first item in the list if timestamp is from the past
    const firstDataPointIndex = new Date(list[0].dt_txt).getTime() >= Date.now() ? 0 : 1;
    const slicedForecastList = list.slice(firstDataPointIndex, this.forecastItemsCount + firstDataPointIndex);
    return this.parseForecast(slicedForecastList);
  }

  private parseForecast (list: CityWeatherForecastListItemResponse[]) {
    return list.map(item => ({
      temperature: +item.main.temp.toFixed(1),
      windSpeed: item.wind.speed,
      ts: new Date(item.dt_txt.replace(/-/g, '/'))
    }));
  }
}
