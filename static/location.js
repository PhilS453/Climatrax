const params = new URLSearchParams(window.location.search);
const city = params.get("city");
const lat = params.get("lat");
const lng = params.get("lng");


// Initialize page on load
document.addEventListener("DOMContentLoaded", () => {
    loadWeatherPage();
    if (city && lat && lng) {
        console.log("Fetching weather data for:", { city, lat, lng });
        fetchWeatherData(lat, lng);
    } else {
        console.error("Missing city or coordinates:", { city, lat, lng });
        document.getElementById("weatherResults").textContent = "Weather data unavailable: Missing coordinates.";
        document.getElementById("wildfireBtn").disabled = true;
    }
});

// Update page title with city
function loadWeatherPage() {
    if (city) {
        document.getElementById("cityName").textContent = `Weather for ${city}`;
        console.log("Weather title updated:", city);
    } else {
        console.error("No city found");
        document.getElementById("cityName").textContent = "No city selected";
        document.getElementById("weatherResults").textContent = "No location provided.";
        document.getElementById("wildfireBtn").disabled = true;
    }
}

// Fetch weather data from OpenWeatherMap API
function fetchWeatherData(lat, lng) {
    const resultsDiv = document.getElementById("weatherResults");
    resultsDiv.textContent = "Loading weather data...";

    if (!lat || !lng) {
        console.error("Invalid coordinates provided");
        resultsDiv.textContent = "Error: Invalid coordinates.";
        return;
    }

    try {
        lat = parseFloat(lat);
        lng = parseFloat(lng);
    } catch (e) {
        console.error("Invalid coordinate values");
        resultsDiv.textContent = "Error: Invalid coordinate values.";
        return;
    }

    if (!(-90 <= lat && lat <= 90 && -180 <= lng && lng <= 180)) {
        console.error("Coordinates out of valid range");
        resultsDiv.textContent = "Error: Coordinates out of valid range.";
        return;
    }

    const exclude = "minutely,alerts";
    const units = "metric";
    const apiUrl = `/weather?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`;
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather API request failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            displayWeatherResults(data);
        })
        .catch(error => {
            console.error("Weather API error:", error);
            resultsDiv.textContent = `Error fetching weather data: ${error.message}`;
        });
}

// Display weather data
function displayWeatherResults(data) {
    const resultsDiv = document.getElementById("weatherResults");
    resultsDiv.innerHTML = `
        <h3>Weather Data</h3>
        <p><strong>Temperature:</strong> ${data.temperature ? data.temperature + "°C" : "N/A"}</p>
        <p><strong>Feels Like:</strong> ${data.feels_like ? data.feels_like + "°C" : "N/A"}</p>
        <p><strong>Description:</strong> ${data.description || "N/A"}</p>
        <p><strong>Wind Speed:</strong> ${data.wind_speed ? data.wind_speed + " m/s" : "N/A"}</p>
        <p><strong>Humidity:</strong> ${data.humidity ? data.humidity + "%" : "N/A"}</p>
        <p><strong>UV Index:</strong> ${data.uvi ?? "N/A"}</p>
        <p><strong>Cloud Cover:</strong> ${data.clouds ? data.clouds + "%" : "N/A"}</p>
    `;
}

// Wildfire button event listener
const wildfireBtn = document.getElementById("wildfireBtn");
wildfireBtn.addEventListener("click", () => {
    if (city) {
        console.log("Fetching wildfire data for:", city);
        fetchWildfireData(city);
    } else {
        console.error("No city available for wildfire data");
        document.getElementById("wildfireResults").textContent = "No city selected.";
    }
});

// Fetch wildfire data (assuming backend endpoint)
function fetchWildfireData(city) {
    const apiUrl = `/wildfire?city=${encodeURIComponent(city)}`;
    const resultsDiv = document.getElementById("wildfireResults");
    resultsDiv.textContent = "Loading wildfire data...";

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Wildfire API request failed: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            displayWildfireResults(data);
        })
        .catch(error => {
            console.error("Wildfire API error:", error);
            resultsDiv.textContent = `Error fetching wildfire data: ${error.message}`;
        });
}

// Display wildfire results
function displayWildfireResults(data) {
    const resultsDiv = document.getElementById("wildfireResults");
    if (data && data.length > 0) {
        let output = '<ul>';
        data.forEach(item => {
            output += `<li>Wildfire at <a href="https://www.google.com/maps/@${item.latitude},${item.longitude},11z" target="_blank">Lat: ${item.latitude}, Lon: ${item.longitude}</a>, Confidence: ${item.confidence}% (Detected: ${item.acq_date})</li>`;
        });
        output += '</ul>';
        resultsDiv.innerHTML = output;
    } else {
        resultsDiv.textContent = 'No wildfire incidents found near this city.';
    }
}