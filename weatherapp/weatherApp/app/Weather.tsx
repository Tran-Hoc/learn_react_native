import { useState } from "react";

import { getForecast, getWeather } from "../libs/api";

import {
  Pressable,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  Switch,
  StatusBar,
} from "react-native";
import { ForecastItem, WeatherResponse } from "@/types";
import getStyles from "./styles";

const Weather = () => {
  const [city, setCity] = useState<string>("HO CHI MINH");
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [forecastData, setForecastData] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const styles = getStyles(darkMode);

  const handleGetWeather = async () => {
    setLoading(true);
    setForecastData([]);
    const data = await getWeather(city);
    await setWeatherData(data || null);
    setLoading(false);
  };

  const hanleGetforecast = async () => {
    setLoading(true);
    handleGetWeather();
    const data = await getForecast(city);
    await setForecastData(data || []);
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        barStyle={darkMode ? "light-content" : "dark-content"}
        backgroundColor={darkMode ? "#000" : "#fff"}
      />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={[styles.weatherText, { marginRight: 8 }]}>
            Dark Mode
          </Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <Text style={styles.title}>Weather App</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={darkMode ? "#aaa" : "#555"}
          placeholder="Enter city"
          value={city}
          onChangeText={setCity}
        />
        <Pressable
          onPress={handleGetWeather}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: !pressed
                ? "#22b961ff"
                : styles.button.backgroundColor,
            },
          ]}
        >
          <Text style={styles.buttonText}>Get Current Weather</Text>
        </Pressable>

        <Pressable
          onPress={hanleGetforecast}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: !pressed
                ? "#22b961ff"
                : styles.button.backgroundColor,
            },
          ]}
        >
          <Text style={styles.buttonText}>Get forecast</Text>
        </Pressable>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#2ecc71"
            style={{ marginTop: 16 }}
          />
        )}
        {weatherData && !loading && (
          <View style={styles.weatherInfo}>
            <Text style={styles.heading}>
              {" "}
              {weatherData.country},{weatherData.location}
            </Text>
            <Image
              source={{ uri: "https:" + (weatherData.icon ?? "") }} // WeatherAPI returns //cdn... without https
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.weatherText}>
              <Text style={styles.heading}>Temperature: </Text>
              {weatherData.temperature} °C
            </Text>
            <Text style={styles.weatherText}>
              <Text style={styles.heading}>Description: </Text>
              {weatherData.description}
            </Text>
          </View>
        )}
        {Array.isArray(forecastData) && forecastData.length > 0 && !loading && (
          <View style={styles.weatherInfo}>
            <Text style={styles.heading}>Forecast </Text>

            {forecastData.map((forecastItem, index: number) => (
              <View
                key={index}
                style={{
                  marginVertical: 10,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: styles.weatherInfo.borderColor,
                  borderRadius: 8,
                  backgroundColor: styles.weatherInfo.backgroundColor,
                }}
              >
                <Text style={styles.weatherText}>
                  <Text style={styles.subheading}>Date:</Text>
                  {new Date(forecastItem.date).toDateString()}
                </Text>

                <Image
                  source={{ uri: "https:" + forecastItem.day.condition.icon }}
                  style={{ width: 50, height: 50 }}
                />

                <Text style={styles.weatherText}>
                  <Text style={styles.subheading}>Temperature:</Text> Max:
                  {forecastItem.day.maxtemp_c} °C, Min:
                  {forecastItem.day.mintemp_c} °C, Avg:
                  {forecastItem.day.avgtemp_c} °C
                </Text>

                <Text style={styles.weatherText}>
                  <Text style={styles.subheading}>Description:</Text>
                  {forecastItem.day.condition.text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Weather;
