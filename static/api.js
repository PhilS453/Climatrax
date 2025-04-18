//text for the user's input country
countryName = document.getElementById("countryName");
//"enter a country/city" text
searchTitle = document.getElementById("searchTitle");



//checks if user's search is valid
var searchedCountry = false;
//country JSON from getLocation()
var countryData;

//html onclick calls this; redirects to each location's weather page
function redirect(location)
{
    window.location.href = `/location?city=${encodeURIComponent(location)}`;
}

//the flow is getLocation => searchLocation => displaySearchResults => fetchResults => displayResults
//Get location starts it all off.
//it accepts values from the text box and call searchLocation() function
function getLocation()
{
    //accept different capitalization of strings
    if(!searchedCountry){
        const userInput = document.getElementById("searchInput").value.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");;
        if(userInput){
            fetchResults(userInput)
            console.log("User searched:", userInput); 
        }else{
            console.log("Error retrieving input from user!");
        }
    }
}

//fetches search results from the backend to display on the website
function fetchResults(query)
{
    console.log("Fetching results of query")
    fetch(`/get_location?query=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("API response:", data);

        //if error, display invalid country
        if (data.error) {
            countryName.textContent = "Invalid Country";
            countryName.style.display = "flex";
            searchTitle.textContent = "Enter a Country:";
        } else { 
            //else, success! update display for cities
            countryName.textContent = query;
            countryName.style.display = "flex";
            searchTitle.textContent = "Enter a City:";
            countryData = data;
            searchedCountry = true;
            document.getElementById("searchInput").value = "";

            createResultDivs(countryData);
        }
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}

function displayResults(results)
{
    if (!results) {
        return;
    }

    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    const userInput = document.getElementById("searchInput").value.toLowerCase();
    console.log("User Input City:", userInput);

    const filteredResults = results.filter(city =>
        city.city && city.city.toLowerCase().startsWith(userInput)
    );
    console.log("Filtered Results:", filteredResults);

    if (filteredResults.length === 0) {
        console.error("No cities found.")
        searchResults.style.display = "flex";
        searchResults.innerHTML = "<div>No matching cities found</div>";
        return;
    }

    //create the search result divs
    createResultDivs(filteredResults);
}

function createResultDivs(results)
{
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
    searchResults.style.display = "flex";

    results.forEach(city => {
        const cityDiv = document.createElement("div");
        cityDiv.className = "resultContainer";
        cityDiv.textContent = city.city;
        cityDiv.style.color = "white";
        cityDiv.onclick = () => redirect(city.city);
        searchResults.appendChild(cityDiv);
    });
}

//waits for the submit button to be clicked
//calls getlocation() 
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    getLocation();
    displayResults(countryData);
});