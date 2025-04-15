from flask import Flask, render_template
import climate  # assuming this is your climate.py
from climate import Climate

app = Flask(__name__)

@app.route("/")
def index():
    df = Climate.getWildfireData("San Francisco")
    
    if df is not None:
        # Get the number of wildfires detected
        wildfire_count = len(df)
    else:
        wildfire_count = 0

    return render_template('index.html', data=df.to_dict(orient='records'), wildfire_count=wildfire_count)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
