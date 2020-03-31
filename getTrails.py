import requests
import json
from math import radians, cos, sin, asin, sqrt
import config

# a class to store the variables for the users location.
class Location:
	def __init__(self, user_lat, user_lon):
		self.user_lat = user_lat
		self.user_lon = user_lon


class Trail(Location):
	"""
	This will store all of our data we get from our JSON file through the MTB get-trails
	API.  Also will calculate distance to origin
	"""

	def __init__(self, id, name, conditionStatus, conditionDetails, conditionDate, rating, lat, lon):
		self.id = id
		self.name = name
		self.conditionStatus = conditionStatus
		self.conditionDetails = conditionDetails
		self.conditionDate = conditionDate
		self.rating = rating
		self.lat = lat
		self.lon = lon

	# to calculate the distance between the trail location and the location that the user entered.
	# TODO need to fix how I get the users input location.  Can we inherit it?

	#def get_distance_to_origin(selected_lat, selected_lon, lat2, lon2):
	#    # The math module contains a function named 
	#    # radians which converts from degrees to radians.
	#
	#    lon2 = self.lon
	#    lat2 = self.lat
	#    selected_lon = radians(selected_lon)
	#    lon2 = radians(lon2)
	#    selected_lat = radians(selected_lat)
	#    lat2 = radians(lat2) 
	#
	#    # Haversine formula
	#    dlon = lon2 - selected_lon
	#    dlat = lat2 - selected_lat
	#    a = sin(dlat / 2)**2 + cos(selected_lat) * cos(lat2) * sin(dlon / 2)**2
	#    c = 2 * asin(sqrt(a))
	#    # Radius of earth in kilometers. Use 3956 for miles
	#    r = 6371
	#    kilometers = c * r
	#    miles = kilometers * 0.62137
	#    # calculate the result
	#    return miles 

# Get all the trails within a given distance from the user.
def get_trails(lat, lon, maxDistance, key):

	request = requests.get(f'http://www.mtbproject.com/data/get-trails?lat={lat}&lon={lon}&maxDistance={maxDistance}&key={key}')

	# Parse our JSON output
	trails_text = request.text
	trails_dict = json.loads(trails_text)

	trails = []
	# grab out keys in the JSON output for each variable and store the key-values into our trails class.
	# we will then store all of our classes as objects in our trails lists for later use.
	for t in trails_dict['trails']:
		# trail_names.append(t['name'])
		name = t['name']
		id = t['id']
		conditionStatus = t['conditionStatus']
		conditionDate = t['conditionDate']
		conditionDetails = t['conditionDetails']
		rating = t['stars']
		lat = t['latitude']
		lon = t['longitude']
		trail = Trail(id=id, name=name, conditionStatus=conditionStatus, conditionDetails=conditionDetails, conditionDate=conditionDate,
					rating=rating, lat=lat, lon=lon)
		trails.append(trail)

	return trails


if __name__ == "__main__":
 
	user_location=Location(user_lat=40.985082, user_lon=-76.768195)

	trails = get_trails(lat=40.985082, lon=-76.768195, maxDistance=150, key=config.mtb_api_key)

	# output some info to make sure everyting still works.
	for trail in trails:
		print(f'ID: {trail.id}')
		print(f'Name: {trail.name}')
		print(f'Rating: {trail.rating}\n')