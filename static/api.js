//search form is the search box where users search for a country
const searchForm = document.getElementById("searchForm");
//result container will hold all / some results
const resultContainer = document.getElementById('resultContainer');

//event listener for the search form
searchForm.addEventListener("submit", function(event) {
    event. preventDefault(); //prevents a page refresh every submission

    const userInput = document.getElementById("searchInput").value; //user's search input
    console.log("User searched:", userInput);

//html onclick calls this; redirects to each location's weather page
function redirect(location)
{
    window.location.href = `/location/${location}`;
}

//the flow is getLocation => searchLocation => displaySearchResults => fetchResults => displayResults

//Get location starts it all off.
//it accepts values from the text box and call searchLocation() function
function getLocation()
{
    const userInput = document.getElementById("searchInput").value;
    if(userInput){
        searchLocation(userInput);
        console.log("User searched:", userInput);

    }else{
        console.log("Error retrieving input from user!");
    }
}

function searchLocation(query)
{
    fetchResults(query);
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
        displayResults(data);
    })
    .catch(error => console.error("Fetch error:", error));
    displayResults(searchStatus, results)
}

function displayResults(searchStatus, results)
{




    //code this after fetchResults implementation
    //if searchStatus=true (the location was found), display search results
    //iterate through search results to display a DOM element per result
    //feel free to delete this before coding
}
//waits for the submit button to be clicked
//calls getlocation() 
searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    getLocation(); 
});