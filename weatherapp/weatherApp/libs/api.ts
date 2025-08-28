import { ForecastItem, WeatherResponse } from "@/types";
import { Alert } from "react-native";
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const getWeather = async (city: string): Promise<WeatherResponse> => {
  try {
    city = city.trim() === "" ? (city = "HO CHI MINH") : city;
    const apiUrl = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    // WeatherAPI error check
    if (data.error) {
      throw new Error(data.error.message);
    }

    const temperature = data.current.temp_c;
    const description = data.current.condition.text;
    const icon = data.current.condition.icon;
    const country = data.location.country;
    const location = data.location.name;
    // console.log("Current weather:", data);
    const weather: WeatherResponse = {
      temperature,
      description,
      icon,
      country,
      location,
    };
    return weather;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    Alert.alert("Error", "Failed to fetch weather data");
    return {
      temperature: 0,
      description: "Unavailable",
      icon: "",
      country: "",
      location: "",
    };
  }
};

export const getForecast = async (city: string): Promise<ForecastItem[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast.json`, {
      params: {
        key: API_KEY,
        q: encodeURIComponent(city), // ✅ mã hóa để tránh lỗi
        days: 3,
        aqi: "no",
        alerts: "no",
      },
    });

    // console.log(response);
    return response.data.forecast.forecastday;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    Alert.alert("Error", "Failed to fetch forecast data. Please try again.");
    return [];
  }
};
