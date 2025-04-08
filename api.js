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


