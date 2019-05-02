export interface WeatherResponse {
  // weather condition id
  id: number;
  // group of weather parameters
  main: string;
  // weather condition within the group
  description: string;
  // weather icon id
  icon: string;
}

export interface CityWeatherResponse {
  // internal parameter
  base: string;
  // cloudness, %
  clouds: {
    all: number
  };
  // internal parameter
  code: number;
  coord: {
    // city geo location, longitude
    lon: number;
    // city geo location, latitude
    lat: number;
  };
  // time of data calculation, unix, UTC
  dt: number;
  // city id
  id: number;
  main: {
    // temperature
    temp: number;
    // atmospheric pressure
    pressure: number;
    // humidity, %
    humidity: number;
    // minimum temperature at the moment
    temp_min: number;
    // maximum temperature at the moment
    temp_max: number;
    // atmospheric pressure on the sea level
    sea_level: number;
    // atmospheric pressure on the ground
    grnd_level: number
  };
  // city name
  name: string;
  rain?: {
    // rain volume for the last 1hour, mm
    '1h': number;
    // rain volume for the last 3hours, mm
    '3h': number
  };
  snow?: {
    // snow volume for the last 1hour, mm
    '1h': number;
    // snow volume for the last 3hours, mm
    '3h': number
  };
  sys: {
    // country code
    country: string;
    // internal parameter
    id: number;
    // internal parameter
    message: number;
    // sunrise time, unit, UTC
    sunrise: number;
    // sunset time, unit, UTC
    sunset: number;
    // internal parameter
    type: number;
  };
  visibility: number;
  weather: WeatherResponse[];
  wind: {
    // wind speed, meter/sec
    speed: number;
    // wind direction, degrees
    deg?: number;
  };
}

export interface GroupWeatherResponse {
  // count
  cnt: number;
  // list of city weather data
  list: CityWeatherResponse[];
}

export interface CityWeatherForecastListItemResponse {
  dt: number;
  main: {
    temp: number,
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string
    }
    ];
  clouds: {
    all: number
  };
  wind: {
    speed: number;
    deg?: number
  };
  sys: {
    pod: string
  };
  dt_txt: string;
}

export interface CityWeatherForecastResponse {
  cod: number;
  message: number;
  cnt: number;
  list: CityWeatherForecastListItemResponse[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string
  };
}
