import requests
from requests.exceptions import HTTPError, Timeout

url = "https://teach-stack-khmer.vercel.app/api/category/education"
headers = {
    # Headers must be Key: Value pairs
    "x-api-token": "93be302a20343ee34f4049757949185554b479d6ff847766183412724981177d",
    "Accept": "application/json"
}

try:
    # 3600000 is too long; 30 seconds is standard for slow local APIs
    response = requests.get(url, headers=headers, timeout=30)

    # This checks if the status code is 200-299
    response.raise_for_status()

    # Parse and print the actual data
    data = response.json()
    print(data)

except HTTPError as http_err:
    print(f"HTTP error occurred: {http_err}")  # e.g., 401 Unauthorized
except Timeout:
    print("The request timed out.")
except Exception as err:
    print(f"An unexpected error occurred: {err}")