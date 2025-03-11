from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import pymongo
MONGOURL="mongodb+srv://deepgada2003:Deepesh1234@tbcluster.gxajf.mongodb.net/?retryWrites=true&w=majority&appName=tbcluster"

client = pymongo.MongoClient(MONGOURL)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from pymongo import MongoClient

# Assuming you have already set up the MongoDB client and database

db = client['tb27']


@csrf_exempt
def authenticate_user(request):
    if request.method == 'POST':
        try:
            # Parse the JSON body
            body = json.loads(request.body)

            # Extract username and password from the request body
            username = body.get('username')
            password = body.get('password')

            if not username or not password:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)

            print(f"Authenticating Username: {username}")
            print(f"Password: {password}")

            # Access the users collection
            collection = db['users']  # Ensure this is a dedicated users collection

            # Find the user in the database
            user = collection.find_one({'username': username, 'password': password})

            if user:
                return JsonResponse({'message': 'Login successful.', 'username': username}, status=200)
            else:
                return JsonResponse({'error': 'Invalid username or password.'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

        except Exception as e:
            print(f"Error: {str(e)}")
            return JsonResponse({'error': 'An error occurred while authenticating.', 'details': str(e)}, status=500)

    # If not a POST request, return a 405 Method Not Allowed response
    return JsonResponse({'error': 'Method not allowed.'}, status=405)
@csrf_exempt
def create_user(request):
    if request.method == 'POST':
        try:
            # Parse the JSON body
            body = json.loads(request.body)

            # Extract username and password from the request body
            username = body.get('username')
            password = body.get('password')

            if not username or not password:
                return JsonResponse({'error': 'Username and password are required.'}, status=400)

            print(f"Kanji Username: {username}")
            print(f"Password: {password}")

            # Access a collection for user data (or use a single collection for all users)
            collection = db[username]  # Assuming a single 'users' collection for storing all users

            # Check if the username already exists
            if collection.find_one({'username': username}):
                return JsonResponse({'error': 'Username already exists.'}, status=400)

            # Create the new user
            user_data = {'username': username, 'password': password}
            collection.insert_one(user_data)

            # Return a success response
            return JsonResponse({'message': 'User created successfully.', 'username': username}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON format.'}, status=400)

        except Exception as e:
            print(f"Error: {str(e)}")
            return JsonResponse({'error': 'An error occurred while creating the user.', 'details': str(e)}, status=500)

    # If not a POST request, return a 405 Method Not Allowed response
    return JsonResponse({'error': 'Method not allowed.'}, status=405)

def check(request):
    return JsonResponse({"message": "Hello"})




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from pymongo import MongoClient
from datetime import datetime

MONGOURL = "mongodb+srv://deepgada2003:Deepesh1234@tbcluster.gxajf.mongodb.net/?retryWrites=true&w=majority&appName=tbcluster"

client = MongoClient(MONGOURL)
db2 = client['Messages']

collection = db2["all"] 

@csrf_exempt
def save_message(request):
    if request.method == 'POST':
        try:
            # Parse request body
            body = json.loads(request.body)

            username = body.get("username")  # Sender's username
            message = body.get("message")  # Message text
            group = body.get("group")  # Selected group (Crypto, Forex, Stocks)

            if not username or not message or not group:
                return JsonResponse({"error": "Username and message are required."}, status=400)

            # Add timestamp
            timestamp = datetime.utcnow()

            # Construct message document
            message_data = {
                "username": username,
                "message": message,
                "group": group,  # Store the group name

                "timestamp": timestamp.strftime("%Y-%m-%d %H:%M:%S")  # Convert to readable format
            }

            # Insert message into MongoDB
            collection.insert_one(message_data)

            return JsonResponse({"message": "Message saved successfully."}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)

        except Exception as e:
            return JsonResponse({"error": "An error occurred.", "details": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed."}, status=405)


@csrf_exempt
def get_messages(request):
    if request.method == 'GET':
        try:
            
            group = request.GET.get("group")  # ✅ Get group from query params
            print(group)
            if not group:
                return JsonResponse({"error": "Group parameter is missing."}, status=400)

            # ✅ Fetch only messages where `group == requested group`
            messages = list(collection.find({"group": group}, {"_id": 0}).sort("timestamp", -1))

            print(f"Fetched {len(messages)} messages for group {group}")  # ✅ Debug Log

            return JsonResponse({"messages": messages}, status=200)

        except Exception as e:
            print(f"Error fetching messages: {str(e)}")  # ✅ Debug Log for Errors
            return JsonResponse({"error": "An error occurred while fetching messages.", "details": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed."}, status=405)
