class Location:

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

        