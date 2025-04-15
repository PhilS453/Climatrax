#this is a file to test the api call from the .env file.
import os
from dotenv import load_dotenv

load_dotenv()  # Loads .env by default

api_key = os.getenv('WILDFIRE_API_KEY')

if api_key:
    print(f"✅ API key loaded successfully: {api_key[:9]}... (truncated)")
else:
    print("❌ API key not loaded. Check your .env file.")
