(()=>{
    // Get element by ID or throw an error if missing
    function requireElement(id) {
        const el = document.getElementById(id);
        if (!el) {
            throw new Error(`Missing required element with id: "${id}"`);
        }
        return el;
    }
    const weatherStatus = requireElement("status");
    const weatherContainer = requireElement("weather");
    const celsiusBtn = requireElement("celsius-btn");
    const fahrenheitBtn = requireElement("fahrenheit-btn");
    const kmphBtn = requireElement("kmph-btn");
    const mphBtn = requireElement("mph-btn");
    let currentWeatherData = null; // store fetched data
    let isCelsius = true; // default to Celsius
    let isKmph = true; // default to km/h
    // Convert Open-Metro API results to something readable
    function getWeatherDescription(code) {
        switch(code){
            case 0:
                return "Clear sky ☀️";
            case 1:
            case 2:
            case 3:
                return "Cloudy ⛅️";
            case 45:
            case 48:
                return "Fog 🌫️";
            case 51:
            case 53:
            case 55:
                return "Drizzle 🌦️";
            case 61:
            case 63:
            case 65:
                return "Rain 🌧️";
            case 71:
            case 73:
            case 75:
                return "Snow ❄️";
            case 80:
            case 81:
            case 82:
                return "Rain showers 🌧️";
            case 95:
                return "Thunderstorm ⛈️";
            case 99:
                return "Thunderstorm with hail 🌩️";
            default:
                return "Unknown weather";
        }
    }
    function cToF(c) {
        return c * 9 / 5 + 32;
    }
    function kmphToMph(kmph) {
        return kmph / 1.609;
    }
    function renderWeather() {
        if (!currentWeatherData) return;
        const temp = isCelsius ? currentWeatherData.current_weather.temperature : cToF(currentWeatherData.current_weather.temperature);
        const tempUnit = isCelsius ? "°C" : "°F";
        const windSpeed = isKmph ? currentWeatherData.current_weather.windspeed : kmphToMph(currentWeatherData.current_weather.windspeed);
        const speedUnit = isKmph ? "km/h" : "mph";
        const { weathercode } = currentWeatherData.current_weather;
        weatherContainer.innerHTML = `
			<p><strong>Temperature:</strong> ${temp.toFixed(1)}${tempUnit}</p>
			<p><strong>Wind Speed:</strong> ${windSpeed.toFixed(1)} ${speedUnit}</p>
			<p><strong>Condition:</strong> ${getWeatherDescription(weathercode)}</p>
		`;
    }
    function fetchWeather(lat, lon) {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        weatherStatus.textContent = "Fetching weather data...";
        fetch(url).then((res)=>res.json()).then((data)=>{
            console.log("API response:", data);
            currentWeatherData = data;
            weatherStatus.textContent = "Current weather at your location:";
            renderWeather();
        }).catch((err)=>{
            weatherStatus.textContent = "Failed to fetch weather data.";
            console.error("Fetch error:", err);
        });
    }
    celsiusBtn.addEventListener("click", ()=>{
        if (!isCelsius) {
            isCelsius = true;
            celsiusBtn.classList.add("active");
            fahrenheitBtn.classList.remove("active");
            renderWeather();
        }
    });
    fahrenheitBtn.addEventListener("click", ()=>{
        if (isCelsius) {
            isCelsius = false;
            fahrenheitBtn.classList.add("active");
            celsiusBtn.classList.remove("active");
            renderWeather();
        }
    });
    kmphBtn.addEventListener("click", ()=>{
        if (!isKmph) {
            isKmph = true;
            kmphBtn.classList.add("active");
            mphBtn.classList.remove("active");
            renderWeather();
        }
    });
    mphBtn.addEventListener("click", ()=>{
        if (isKmph) {
            isKmph = false;
            mphBtn.classList.add("active");
            kmphBtn.classList.remove("active");
            renderWeather();
        }
    });
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
        }, (error)=>{
            weatherStatus.textContent = "Location access denied.";
            console.error(error);
        });
    } else {
        weatherStatus.textContent = "Geolocation not supported.";
    }
})();

//# sourceMappingURL=weather.js.map