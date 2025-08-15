const API_KEY = "ce358679c6374e138b8154106250408";
const CITY = "dalat"; // Replace with your city
const cities = ["da lat", "hanoi", "ho chi minh", "da nang", "nha trang"];
async function getWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Unknown error");
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function displayWeather(city) {
  try {
    const data = await getWeather(city);
    document.getElementById("weather").innerHTML = `
  <h2>Weather in ${data.location.name}</h2>
  <p>Temperature: ${data.current.temp_c}°C</p>
`;
  } catch (error) {
    document.getElementById("weather").innerHTML = `
  <h2>Error fetching weather data</h2>
  <p>${error.message}</p>
`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("getWeatherbtn")
    .addEventListener("click", async () => {
      const city = document.getElementById("cityInput").value.trim();
      if (city) {
        document.getElementById(
          "weather"
        ).innerHTML = `<h2>Loading weather for ${city}...</h2>`;
        await displayWeather(city);
      } else {
        document.getElementById(
          "weather"
        ).innerHTML = `<h2>Please enter a city name.</h2>`;
      }
    });
});

// weather forecast 3 days
async function getForecast(city, days = 3) {
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Unknown error");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

// forecast for one city
async function displayForecast(city, days = 3) {
  try {
    const data = await getForecast(city);
    const current = data.current;
    const forecast = data.forecast.forecastday;
    let html = `<h2>Weather Forecast for ${data.location.name}</h2>
                <p>Current Temperature: ${current.temp_c}°C</p>
                <p>Condition: ${current.condition.text}</p>
                <h3>${days} - Day Forecast:</h3>
                <ul> <div style="display: flex; flex-wrap: wrap;">`;
    forecast.forEach((day) => {
      html += `<div style="display: inline-block;  margin: 10px; text-align: center;">
                    <h4>${day.date}</h4>
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
                    <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                    <p>Min Temp: ${day.day.mintemp_c}°C</p>
                    <p>Condition: ${day.day.condition.text}</p>
                </div>`;
    });
    html += `</div></ul>`;
    document.getElementById("forecast").innerHTML = html;
  } catch (error) {
    document.getElementById(
      "forecast"
    ).innerHTML = `<h2>Error fetching forecast data</h2>
    <p>${error.message}</p>`;
  }
}

// call api for many cities at the same time
async function getForecastsForCities(cities, days = 3) {
  const forecastPromises = await Promise.all(
    cities.map((city) =>
      getForecast(city, days).catch((error) => {
        console.error(`Error fetching forecast for ${city}:`, error);
      })
    )
  );

  return forecastPromises;
}

function displayAllForecasts(forecasts) {
  let html = "<h2>Weather Forecast for Multiple Cities</h2>";

  forecasts.forEach((result) => {
    if (result.error) {
      html += `<div style="border:1px solid red;padding:10px;margin-bottom:10px;">
                <h3>${result.city} - ❌ Failed</h3>
                <p>${result.error.message}</p>
              </div>`;
      return;
    }

    html += `<div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;">
      <h3>${result.location.name}, ${result.location.country}</h3>
      <p><strong>Current:</strong> ${result.current.temp_c}°C - ${result.current.condition.text}</p>
      <img src="${result.current.condition.icon}" alt="weather icon" />
      <h4>3-Day Forecast:</h4>`;

    result.forecast.forecastday.forEach((day) => {
      html += `<div>
        <strong>${day.date}</strong>: ${day.day.condition.text}, 
        Max: ${day.day.maxtemp_c}°C, Min: ${day.day.mintemp_c}°C
        <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
      </div>`;
    });

    html += `</div>`;
  });

  document.getElementById("multiForecast").innerHTML = html;
}

// combine with Geolocaltion API
async function getForecastByCoords(lat, lon, days = 3) {
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=${days}&aqi=no&alerts=no`;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Unknown error");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

function getForecastByGeolocation() {
  if (!navigator.geolocation) {
    document.getElementById("forecast").innerHTML =
      "<p>Geolocation is not supported by your browser.</p>";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      document.getElementById(
        "forecast"
      ).innerHTML = `<h2>Loading forecast for your location...</h2>`;

      try {
        const data = await getForecastByCoords(lat, lon);
        displayForecastData(data); // separate display logic
      } catch (error) {
        document.getElementById(
          "forecast"
        ).innerHTML = `<h2>Error:</h2><p>${error.message}</p>`;
      }
    },
    (error) => {
      document.getElementById("forecast").innerHTML =
        "<p>Permission denied or failed to get location.</p>";
    }
  );
}

function displayForecastData(data) {
  const current = data.current;
  const forecast = data.forecast.forecastday;

  let html = `<h2>Weather Forecast for ${data.location.name}</h2>
              <p>Current Temperature: ${current.temp_c}°C</p>
              <p>Condition: ${current.condition.text}</p>
              <h3>3-Day Forecast:</h3>`;

  forecast.forEach((day) => {
    html += `<div>
              <h4>${day.date}</h4>
              <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" />
              <p>Max: ${day.day.maxtemp_c}°C, Min: ${day.day.mintemp_c}°C</p>
              <p>${day.day.condition.text}</p>
            </div>`;
  });

  document.getElementById("forecast").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("getForecastbtn")
    .addEventListener("click", async () => {
      const city = document.getElementById("forecastCityInput").value.trim();
      if (city) {
        document.getElementById(
          "forecast"
        ).innerHTML = `<h2>Loading forecast for ${city}...</h2>`;
        await displayForecast(city);
      } else {
        document.getElementById(
          "forecast"
        ).innerHTML = `<h2>Please enter a city name.</h2>`;
      }
    });

  // Display forecasts for multiple cities
  document
    .getElementById("getForecastcitesbtn")
    .addEventListener("click", async () => {
      try {
        const forecasts = await getForecastsForCities(cities);
        displayAllForecasts(forecasts);
      } catch (err) {
        document.getElementById(
          "multiForecast"
        ).innerHTML = `<p>Error: ${err.message}</p>`;
      }
    });

  // auto update weather every 10 minutes
//   getForecastsForCities(cities).then(displayAllForecasts);
  setInterval(async () => {
    const forecasts = await getForecastsForCities(cities);
    displayAllForecasts(forecasts);
  }, 10 * 60 * 1000); // every 10 minutes

  // combine with Geolocaltion API
//   getForecastByGeolocation();

  document
    .getElementById("getMyLocationForecastBtn")
    .addEventListener("click", getForecastByGeolocation);
});
