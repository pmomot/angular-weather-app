import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { RootState } from '../../state';
import { GetGroupWeather } from '../../state/city/city.actions';
import { cityIdList } from '../cities';

@Injectable()
export class WeatherDataResolver implements Resolve<any> {

  constructor (private store: Store<RootState>) {}

  resolve () {
    this.store.dispatch(new GetGroupWeather(cityIdList));
    return of(true);
  }
}
