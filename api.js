const searchForm = document.getElementById("searchForm");

//event listener for the search form
searchForm.addEventListener("submit", function(event) {
    event. preventDefault(); //prevents a page refresh every submission

    const userInput = document.getElementById("searchInput").value; //user's search input
    console.log(userInput);
})

//this function fetches location data from Flask API

async function getLocation(query){
    try{
        // make the GET request
        const response = await fetch('/get_location?query=${encodeURIComponent(query)}',{
            method: 'GET',
            headers: {
                'Content_Type' : 'application/json'
            }
        });
        if(!response.ok){
            throw new Error('HTTP error! status: ${response.status}')
        }
    }catch (error){
        console.error('Error fetching location:',error)
        return { error: error.message}; 
    }

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

