from flask import Flask, jsonify, request, render_template
from location import search_location

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


if __name__ == "__main__":
    app.run(debug=True,port=5000)