//weather title display
weatherTitle = document.getElementById("weatherTitle");
//temperature text display
tempText = document.getElementById("tempText");
//condition text display
conditionText = document.getElementById("conditionText");
//wildfire button
wildfireBtn = document.getElementById("wildfireBtn");

const params = new URLSearchParams(window.location.search);
const city = params.get("city");

//wildfire button code
wildfireBtn.addEventListener("click", function () {
    if (city) {
        console.log("Fetching wildfire data for:", city);
        fetchWildfireData(city);
    } else {
        console.error("No city available for wildfire data");
        document.getElementById("wildfireResults").textContent = "No city selected.";
    }
    console.log("🔥");
});

//load weather details
function loadWeatherPage()
{
    if (city) {
        document.getElementById("weatherTitle").textContent = `Weather in ${city}`;
        console.log("Weather title updated:", city);

    } else {
        console.error("No city found");
    }
}

function fetchWildfireData(city) {
    const apiUrl = `/wildfire?city=${encodeURIComponent(city)}`;
    const resultsDiv = document.getElementById("wildfireResults");
    resultsDiv.textContent = "Loading wildfire data...";
    //similiar idea from fetchResults in api.js
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

function displayWildfireResults(data) {
    // wildfireResults is apart of location.html towards the bottom
    const resultsDiv = document.getElementById("wildfireResults");
    if (data && data.length > 0) {
        let output = '<ul>';
        data.forEach(item => {
            output += `<li>Wildfire at Lat: ${item.latitude}, Lon: ${item.longitude}, Confidence: ${item.confidence}% (Detected: ${item.acq_date})</li>`;
        });
        output += '</ul>';
        resultsDiv.innerHTML = output;
    } else {
        resultsDiv.textContent = 'No wildfire incidents found near this city.';
    }
}