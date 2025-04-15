import os
from dotenv import load_dotenv
import requests
from datetime import datetime, timedelta
from flask import jsonify

load_dotenv()
API_KEY = os.getenv("API_KEY")


class Weather:

    #to start, i would try getting one of the APIs working (do the calls send valid JSONs?)
    #i'd recommend testing API calls by printing to console or saving the JSON to the file directory
    #however, please do not commit any JSONs to the repo yet
    #once you know the function is calling the API, call displayWeather() and pass the JSON
    #feel free to delete this before coding
    
    #get current weather data from api
    @staticmethod
    def getCurrentWeather():
        lat = 42.3314
        lon = -83.0458
        exclude = "minutely,alerts"
        units = "metric"

        url = (
            f"https://api.openweathermap.org/data/3.0/onecall?"
            f"lat={lat}&lon={lon}&exclude={exclude}&units={units}&appid={API_KEY}"
        )

        response = requests.get(url)

        if response.status_code == 200:
            weather_data = response.json()
            print("Current weather retrieved")

            return weather_data
        else:
            print(f"Error fetching weather: {response.status_code} - {response.text}")
            return None

    #get historical weather data from api
    @staticmethod
    def getWeatherHistory():
        lat = 42.3314
        lon = -83.0458
        
        three_days_ago = datetime.utcnow() - timedelta(days=3)
        unix_time = int(three_days_ago.timestamp())

        url = (
            f"https://api.openweathermap.org/data/3.0/onecall/timemachine?"
            f"lat={lat}&lon={lon}&dt={unix_time}&units=metric&appid={API_KEY}"
        )

        response = requests.get(url)

        if response.status_code == 200:
            weather_data = response.json()
            print("Historical weather retrieved (3 days ago)")
            return weather_data
        else:
            print(f"Error fetching historical weather: {response.status_code} - {response.text}")
            return None

    #CHANGED FROM DISPLAYTRENDS
    #send weather data to frontend to display
    @staticmethod
    def displayWeather(weatherData):
        current = weatherData.get("current", {})
        result = {
            "temperature": current.get("temp"),
            "feels_like": current.get("feels_like"),
            "description": current.get("weather", [{}])[0].get("description", "N/A"),
            "wind_speed": current.get("wind_speed"),
            "humidity": current.get("humidity"),
            "uvi": current.get("uvi"),
            "clouds": current.get("clouds")
        }
        return jsonify(result)


if __name__ == "__main__":
    weather_json = Weather.getCurrentWeather()
    if weather_json:
        print(weather_json["current"])