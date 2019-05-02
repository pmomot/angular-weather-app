import { ActionReducerMap } from '@ngrx/store';

import { cityReducer, CityState } from './city';

export interface RootState {
  city: CityState;
}

export const reducers: ActionReducerMap<RootState> = {
  city: cityReducer
};
