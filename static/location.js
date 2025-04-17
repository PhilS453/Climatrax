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

window.onload = loadWeatherPage;

//wildfire button code
wildfireBtn.addEventListener("click", function() {
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