//search form is the search box where users search for a country

const searchForm = document.getElementById("searchForm");
//result container will hold all / some results
const resultContainer = docoument.getElementById('resultContainer')
//event listener for the search form
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const userInput = document.getElementById("searchInput").value;
    console.log("User searched:", userInput);
    //go to climatrax.py and you can see /get_location
    fetch(`/get_location?query=${encodeURIComponent(userInput)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("API response:", data);
        displayResults(data);
    })
    .catch(error => console.error("Fetch error:", error));
});

//html onclick calls this; redirects to each location's weather page
function redirect(location)
{
    window.location.href = `/location/${location}`;
}



//the flow is getLocation => searchLocation => displaySearchResults => fetchResults => displayResults

//reads location input by user and passes it to location.py
function getLocation()
{
    //i suggest setting up flask and using static test values ("Michigan, Tokyo, Jakarta, etc.")
    //connectivity with the website's buttons can be added once the html is set up
    //feel free to delete this before coding
}

//fetches search results from the backend to display on the website
function fetchResults()
{
    //code this after location.py implementation
    //fetch search results and status from location.py and pass to displayResults
    //feel free to delete this before coding
    displayResults(searchStatus, results)
}

function displayResults(searchStatus, results)
{




    //code this after fetchResults implementation
    //if searchStatus=true (the location was found), display search results
    //iterate through search results to display a DOM element per result
    //feel free to delete this before coding
}

