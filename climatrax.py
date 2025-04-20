from flask import Flask, jsonify, request, render_template
from location import search_location
#import the climate.py file
from climate import Climate
from weather import Weather
#this import below may not be needed 
from cityWildfireData import get_wildfire_data_for_city

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/resources')
def resources():
    return render_template('resources.html')

@app.route('/location')
def location():
    return render_template('location.html')



# @app.route('/get_location',methods =['GET'])
# def get_location():
#     query = request.args.get('query')
#     result, status_code = search_location(query)
#     return jsonify(result), status_code
@app.route('/get_location', methods=['GET'])
def get_location():
    query = request.args.get('query')
    print(f"Debug: Received query {query}")  # Debug statement
    result, status_code = search_location(query)
    return jsonify(result), status_code

@app.route('/wildfire', methods=['GET'])
def wildfire():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City name is required"}), 400
    #make a climate object to access its functions
    climate = Climate()
    #df is pandas dataframe and needed for this api
    df = climate.get_wildfire_data_for_city(city)
    if df is not None:
        # Convert DataFrame to JSON why?
        return jsonify(df.to_dict(orient='records'))
    return jsonify({"error": f"No wildfire data available for {city}"}), 404

    print(f"Debug: Received city name {city}")


@app.route('/weather', methods=['GET'])
def getWeather():
    city = request.args.get('city')
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    
    if not (lat and lng):
        return jsonify({"error": "lat and lng are required"}), 400
    
    weather_data = Weather.getCurrentWeather(lat=lat, lng=lng, city=city)
    if weather_data is not None:
        return Weather.displayWeather(weather_data)
    return jsonify({"error": f"Failed to fetch weather data for {city}"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
