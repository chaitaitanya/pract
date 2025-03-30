alert("If the location is not your loction due to location is of your laptop address");

const apiKey = "9e6a15cda1f94d2f9f294103251103"; // Your API key
const baseUrl = "http://api.weatherapi.com/v1/current.json";

const locationInput = document.getElementById("location");
const searchButton = document.getElementById("btn");
const locationDisplay = document.getElementById("location1");
const feelsLike = document.getElementById("feels-like");
const sunrise = document.getElementById("sunrise"); // Placeholder
const sunset = document.getElementById("sunset"); // Placeholder
const highLow = document.getElementById("high-low"); // Not directly available
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const dewPoint = document.getElementById("dew-point"); // Placeholder
const pressure = document.getElementById("pressure");
const uvIndex = document.getElementById("uv-index");
const visibility = document.getElementById("visibility");
const moonPhase = document.getElementById("moon"); // Placeholder

// Function to fetch weather data
const fetchWeather = (location) => {
  const url = `${baseUrl}?key=${apiKey}&q=${location}&aqi=yes`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Update weather details
      locationDisplay.textContent = data.location.name;
      feelsLike.textContent = `Feels Like: ${data.current.feelslike_c}°C`;
      wind.textContent = `${data.current.wind_kph} km/h`;
      humidity.textContent = `${data.current.humidity}%`;
      pressure.textContent = `${data.current.pressure_mb} mb`;
      visibility.textContent = `${data.current.vis_km} km`;
      uvIndex.textContent = data.current.uv;

      // values for non-available data
      sunrise.textContent = "Not Available"; 
      sunset.textContent = "Not Available"; 
      dewPoint.textContent = "Not Available"; 
      moonPhase.textContent = "Not Available";
      highLow.textContent = "Not Available"; 
    })
    .catch((error) => console.error("Error fetching weather data:", error));
};

// Fetch weather for the current location
const getCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const currentLocation = `${latitude},${longitude}`;
        fetchWeather(currentLocation); // Fetch weather for current location
        
      },
      (error) => {
        console.error("Error getting geolocation:", error);
        alert("Unable to retrieve your location.");
      }
      
    );
    
  } else {
    alert("Geolocation is not supported by your browser try with another browser.");
  }
};

// Event listener for the search button
searchButton.addEventListener("click", () => {
  const location = locationInput.value.trim();
  if (location) {
    fetchWeather(location); // Fetch weather for searched location
  } else {
    alert("Please enter a location.");
  }
});

// Load current location weather on page load
window.onload = getCurrentLocationWeather;
