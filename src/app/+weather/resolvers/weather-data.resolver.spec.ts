import { getTestBed, TestBed } from '@angular/core/testing';

import { WeatherDataResolver } from './weather-data.resolver';
import { Store } from '@ngrx/store';
import { RootState } from '../../state';
import { GetGroupWeather } from '../../state/city/city.actions';
import { cityIdList } from '../cities';

describe('Resolver: WeatherDataResolver', () => {
  let injector: TestBed;
  let resolver: WeatherDataResolver;
  let store: jasmine.SpyObj<Store<RootState>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherDataResolver,
        {provide: Store, useValue: jasmine.createSpyObj('Store', ['dispatch'])}
      ]
    });

    injector = getTestBed();
    resolver = injector.get(WeatherDataResolver);
    store = injector.get(Store);
  });

  describe('resolve()', () => {
    it('should resolve without changes if there is city in query', done => {
      resolver.resolve().subscribe(value => {
        expect(value).toBe(true);
        done();
      });
    });

    it('should resolve with navigation if there is no city in query', () => {
      resolver.resolve();
      expect(store.dispatch).toHaveBeenCalledWith(new GetGroupWeather(cityIdList));
    });
  });
});
