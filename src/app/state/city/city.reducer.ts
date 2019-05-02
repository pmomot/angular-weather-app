import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';

import { CityWeatherData, CityWeatherForecastData } from '../../shared/models';
import { RootState } from '../';

import { CityActions, CityActionsUnion } from './city.actions';

export interface CityState {
  loading: boolean;
  weather: EntityState<CityWeatherData>;
  forecast: EntityState<CityWeatherForecastData>;
}

const cityWeatherAdapter: EntityAdapter<CityWeatherData> = createEntityAdapter<CityWeatherData>({
  selectId: city => city.id
});

const cityWeatherForecastAdapter: EntityAdapter<CityWeatherForecastData> = createEntityAdapter<CityWeatherForecastData>({
  selectId: data => data.city.id
});

export const initialState = {
  weather: cityWeatherAdapter.getInitialState(),
  forecast: cityWeatherForecastAdapter.getInitialState(),
  loading: false
};

export function cityReducer (state = initialState, action: CityActionsUnion) {
  switch (action.type) {

    case CityActions.GetGroupWeather: {
      return {
        ...state,
        loading: true
      };
    }

    case CityActions.GetGroupWeatherDone: {
      return {
        ...state,
        weather: cityWeatherAdapter.addMany(action.payload, state.weather),
        loading: false
      };
    }

    case CityActions.GetGroupWeatherFailed: {
      return {
        ...state,
        loading: false
      };
    }

    case CityActions.GetCityForecastDone: {
      return {
        ...state,
        forecast: cityWeatherForecastAdapter.addOne(action.payload, state.forecast)
      };
    }

    default:
      return state;
  }
}

export const selectCityState = (state: RootState) => state.city;
export const selectGroupWeatherLoading = createSelector(selectCityState, ({loading}) => loading);

const citySelectors = cityWeatherAdapter.getSelectors();
const selectWeatherState = (state: RootState) => state.city.weather;
export const selectGroupWeather = createSelector(selectWeatherState, citySelectors.selectAll);

const forecastSelectors = cityWeatherForecastAdapter.getSelectors();
const selectForecastState = (state: RootState) => state.city.forecast;
export const selectWeatherForecast = createSelector(selectForecastState, forecastSelectors.selectAll);
