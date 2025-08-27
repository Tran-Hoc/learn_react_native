export interface WeatherResponse {
  country: string;
  location: string;
  temperature: number;
  description: string;
  icon: string;
}

export interface ForecastItem {
  country: string;
  location: string;
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

export interface ForecastResponse {
  forecast: {
    forecastday: ForecastItem[];
  };
}
