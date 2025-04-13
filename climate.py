from weather import Weather
import os
from dotenv import load_dotenv

load_dotenv()

WILDFIRE_API_KEY = os.getenv('WILDFIRE_API_KEY')

class Climate:

    #leave getFloodData and compareClimateData alone for now
    #try to get either drought or wildfire API working
    #i'd recommend testing API calls by printing to console or saving the JSON to the file directory
    #however, please do not commit any JSONs to the repo yet
    #once you know the function is calling the API, call displayClimateData() and pass the JSON
    #feel free to delete this before coding

    def getDroughtData():
        pass
    
    def getWildfireData(cityName):
        pass

    def getFloodData():
        pass

    #compare climate data to analyze trends
    def compareClimateData():
        pass

    #send climate data to frontend to display
    def displayClimateData(climateData):
        #use flask to send climate data JSON to frontend
        pass