import os
import requests
import pandas as pd
from dotenv import load_dotenv
from flask import jsonify

# Load environment variables from .env
load_dotenv()

# Debug: Check if the API key is loaded correctly
OPENCAGE_KEY = os.getenv('OPENCAGE_KEY')
#print(f"🌍 OpenCage API Key: {OPENCAGE_KEY}")  # Debug output

WILDFIRE_API_KEY = os.getenv('WILDFIRE_API_KEY')

# Retrieve your API key from the .env file
FIRMS_API_KEY = os.getenv('FIRMS_API_KEY')
OPENCAGE_KEY = os.getenv('OPENCAGE_KEY')  # Assuming you have this in your .env

class Climate:
    def get_coordinates(self, city_name):
        """Fetch coordinates for the given city using OpenCage Geocoding API"""
        url = f'https://api.opencagedata.com/geocode/v1/json?q={city_name}&key={OPENCAGE_KEY}'
        try:
            res = requests.get(url)
            res.raise_for_status()
            data = res.json()
            geometry = data['results'][0]['geometry']
            return geometry['lat'], geometry['lng']
        except Exception as e:
            print(f"❌ Failed to get coordinates for {city_name}: {e}")
            return None, None

    def get_wildfire_data_for_city(self, city_name):
        """Retrieve wildfire data from FIRMS API based on city coordinates"""
        lat, lon = self.get_coordinates(city_name)
        if lat is None or lon is None:
            return None

        # Ensure bounding box is in the correct order: west, south, east, north
        delta = 0.5
        south = max(-90, lat - delta)
        north = min(90, lat + delta)
        west = max(-180, lon - delta)
        east = min(180, lon + delta)
        
        # Directly format the bounding box as a string (no URL encoding)
        bbox_raw = f"{west:.4f},{south:.4f},{east:.4f},{north:.4f}"

        # Construct the API URL for FIRMS
        url = f'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{FIRMS_API_KEY}/VIIRS_NOAA20_NRT/{bbox_raw}/3'
        
        print(f"🔗 API URL for {city_name}: {url}")  # Debug output

        try:
            # Fetch the data as CSV and load it into a pandas DataFrame
            df = pd.read_csv(url)
            print(f"🔥 Retrieved {len(df)} wildfire records near {city_name}")
            return df
        except Exception as e:
            print(f"❌ Failed to retrieve wildfire data for {city_name}: {e}")
            return None

    # This function can now call get_wildfire_data_for_city()
    @staticmethod
    def getWildfireData(city_name):
        """Retrieve wildfire data for a given city."""
        clim = Climate()
        df = clim.get_wildfire_data_for_city(city_name)
        if df is not None:
            print(f"🔥 Wildfire data for {city_name}:")
            print(df.head())  # Print first 5 rows of the wildfire data
            return df
        else:
            print(f"⚠️ No wildfire data available for {city_name}")
        return None



    # Placeholder for other functions
    def getDroughtData(self):
        pass

    def getFloodData(self):
        pass

    # Compare climate data (placeholder)
    def compareClimateData(self):
        pass

    # Send the data to the frontend (Flask) (placeholder)
    @staticmethod
    def displayClimateData(climateData):
        # Sends the wildfire data to the frontend.
        # Currently returns JSON; you can modify it to render a template later.
        if climateData is not None:
            return climateData.to_json(orient='records')
        else:
            return jsonify({"message": "No data available"}), 404
