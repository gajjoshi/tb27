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
def create_user(request):
    print("Inside create_user")
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
            collection = db['users']  # Assuming a single 'users' collection for storing all users

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

