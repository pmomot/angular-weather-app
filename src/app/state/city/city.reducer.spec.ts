import * as city from './city.actions';
import {
  initialState,
  cityReducer,
  selectGroupWeather,
  selectGroupWeatherLoading,
  selectWeatherForecast
} from './city.reducer';
import { CityWeatherData } from '../../shared/models';

const testCityWeather: CityWeatherData = {
  id: 2759794,
  name: 'Amsterdam',
  wind: {
    speed: 10.5
  }
} as CityWeatherData;

const testCityForecast = {
  id: 1,
  wind: {
    speed: 25
  },
  city: {
    id: 1
  }
} as any;

describe('Reducer: City', () => {
  it('should set initial state', () => {
    expect(cityReducer(undefined, {} as any)).toBe(initialState);
  });

  it('should set loading to true on GetGroupWeather action', () => {
    const state = cityReducer(initialState, new city.GetGroupWeather(['2759794']));
    expect(state.loading).toBe(true);
  });

  it('should update store on GetGroupWeatherDone', () => {
    const state = cityReducer(initialState, new city.GetGroupWeatherDone([testCityWeather]));
    expect(state.weather.ids).toEqual([testCityWeather.id]);
    expect(state.weather.entities).toEqual({[testCityWeather.id]: testCityWeather});
    expect(state.loading).toBe(false);
  });

  it('should update store on GetGroupWeatherFailed', () => {
    const state = cityReducer(initialState, new city.GetGroupWeatherFailed({} as Error));
    expect(state.weather.ids).toEqual([]);
    expect(state.loading).toBe(false);
  });

  it('should update store on GetCityForecastDone', () => {
    const state = cityReducer(initialState, new city.GetCityForecastDone(testCityForecast));
    expect(state.forecast.ids).toEqual([testCityForecast.id]);
    expect(state.forecast.entities).toEqual({[testCityForecast.id]: testCityForecast});
  });

  it('should return proper data for selectGroupWeather', () => {
    const state = cityReducer(initialState, new city.GetGroupWeatherDone([testCityWeather]));
    expect(selectGroupWeather({city: state})).toEqual([testCityWeather]);
  });

  it('should return proper data for selectWeatherForecast', () => {
    const state = cityReducer(initialState, new city.GetCityForecastDone(testCityForecast));
    expect(selectWeatherForecast({city: state})).toEqual([testCityForecast]);
  });

  it('should return proper data for selectGroupWeatherLoading on GetGroupWeather', () => {
    const state = cityReducer(initialState, new city.GetGroupWeather({}));
    expect(selectGroupWeatherLoading({city: state})).toBe(true);
  });

  it('should return proper data for selectGroupWeatherLoading on GetGroupWeatherDone', () => {
    const state = cityReducer(initialState, new city.GetGroupWeatherDone([testCityWeather]));
    expect(selectGroupWeatherLoading({city: state})).toEqual(false);
  });

});
