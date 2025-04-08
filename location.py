import json

"""This function is tied to the /get_location end
   Parameters = Country, State or city
   Returns = *** informations we choose to return to help api search
"""

def search_location(query):

    if not query:
        return ({"error": "No query provided"}), 400
    
    try:
        with open('CityDB.json','r')as file:
            city_data = json.load(file)
    except FileNotFoundError:
        return ({"error": "CityDb.json not found"}), 500
    except json.JSONDecodeError:
        return ({"error","Error decoding CityDB.json"}), 500
    
    query = query.lower()
    for location in city_data:
        if(query == location.get('city', '').lower() or 
           query == location.get('state','').lower() or
           query == location.get('country','')):
            result ={
                "city": location.get('city',''),
                "state": location.get('state',''),
                "country": location.get('country','')
            }
            return jsonify(result)
        
    return ({"error": "Location not supported"}), 404


    #search input location (from frontend) using api
    def searchLocation(self):
        searchStatus = False
        results = ''

        #search the db for the input city
        #if it is found, call displaySearchResults, "searchStatus = true"
        #if it is not found, "searchStatus = false"
        #pass "results" as an array/object so we can pass to frontend and iterate through the list...
        #to display each result (if you search "Mi" it will display Michigan, Minnesota, etc.)
        #feel free to delete this before coding

        self.displaySearchResults(searchStatus, results)
        pass

    #send search results to frontend (is the city found or not)
    def displaySearchResults(self, searchStatus, results):
        pass


        