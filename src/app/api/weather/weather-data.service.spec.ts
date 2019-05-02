import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';

import { ROUTES } from '../routes';
import { WeatherDataService } from './weather-data.service';
import {
  CityWeatherForecastResponse,
  CityWeatherResponse
} from './city-weather.interface';

describe('Service: WeatherDataService', () => {
  let injector: TestBed;
  let service: WeatherDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherDataService]
    });

    injector = getTestBed();
    service = injector.get(WeatherDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getCityWeatherForecast()', () => {
    it('makes http request', () => {
      service.getCityWeatherForecast(1).subscribe();
      const req = httpMock.expectOne(`${ROUTES.weatherCityForecast}?id=1&units=metric`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('id')).toBe('1');
      expect(req.request.params.get('units')).toBe('metric');
    });

    it('returns the BE response', () => {
      const testResponse = {cod: 0, list: []} as CityWeatherForecastResponse;
      service.getCityWeatherForecast(2).subscribe(response => {
        expect(response).toBe(testResponse);
      });
      const req = httpMock.expectOne(`${ROUTES.weatherCityForecast}?id=2&units=metric`);
      req.flush(testResponse);
    });
  });

  describe('getWeatherForGroup()', () => {
    it('makes http request', () => {
      service.getWeatherForGroup([1, 2]).subscribe();
      const req = httpMock.expectOne(`${ROUTES.weatherGroup}?id=1,2&units=metric`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('id')).toBe('1,2');
      expect(req.request.params.get('units')).toBe('metric');
    });

    it('returns the BE response', () => {
      const testResponse = {cnt: 0, list: [] as CityWeatherResponse[]};
      service.getWeatherForGroup([1, 2]).subscribe(response => {
        expect(response).toBe(testResponse.list);
      });
      const req = httpMock.expectOne(`${ROUTES.weatherGroup}?id=1,2&units=metric`);
      req.flush(testResponse);
    });
  });
});
