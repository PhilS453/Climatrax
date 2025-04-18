import requests
import pandas as pd

FIRMS_API_KEY = '84b2a8637a2cb8e1d0ac1ca0f54593b7'
OPENCAGE_KEY = '3503431a498c40afab7d217ccfd8ba4a'  # Replace with your actual key

def get_coordinates(city_name):
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

def get_wildfire_data_for_city(city_name):
    """Retrieve wildfire data from FIRMS API based on city coordinates"""
    lat, lon = get_coordinates(city_name)
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

    url = f'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{FIRMS_API_KEY}/VIIRS_NOAA20_NRT/{bbox_raw}/3'
    
    print(f"🔗 API URL for {city_name}: {url}")  # Debug output

    try:
        df = pd.read_csv(url)
        print(f"🔥 Retrieved {len(df)} wildfire records near {city_name}")
        return df
    except Exception as e:
        print(f"❌ Failed to retrieve wildfire data for {city_name}: {e}")
        return None


def test_cities(cities):
    """Test multiple cities for wildfire data"""
    for city in cities:
        print(f"\n🌍 Testing city: {city}")
        df_fires = get_wildfire_data_for_city(city)
        if df_fires is not None:
            print(f"🔥 Wildfire records for {city}:")
            print(df_fires.head())  # Print first 5 rows of the wildfire data
        else:
            print(f"⚠️ No wildfire data available for {city}\n")


# List of cities to test
#cities_to_test = ['San Francisco', 'Los Angeles', 'New York', 'London', 'Paris', 'Tokyo', 'Sydney']

# Test the cities
#test_cities(cities_to_test)
