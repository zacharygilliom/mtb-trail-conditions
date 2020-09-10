import config
import googlemaps
import requests
import json
import time
from math import ceil, radians, sin, cos, asin, sqrt
from flask import Flask, render_template, request, redirect, url_for, jsonify


app = Flask(__name__)


class UserLocation(object):
	''' 
	Defines the location given by the user in latitude and longitude
	'''
	def __init__ (self, user_lat, user_lon):
		self.lat = user_lat
		self.lon = user_lon


class HikeTrail:
	'''
	This will store all of our Hike Trail data we get from our JSON file through the Hike Project get-trails
	API.  Also a method to calculate the distance to the origin.
	'''

	def __init__(self, id, name, conditionStatus, conditionDetails, conditionDate, rating, lat, lon, difficulty):
		self.id = id
		self.name = name
		self.conditionStatus = conditionStatus
		self.conditionDetails = conditionDetails
		self.conditionDate = conditionDate
		self.rating = rating
		self.lat = lat
		self.lon = lon
		self.difficulty = difficulty

	def get_hike_condition_keywords(self):
		# Looking for keywords that might impact trail conditions.
		# i.e. if it is muddy - then most likely it will still be muddy no matter the weather.
		# if the conditionDetails parameter is None - it returns no condtions given.
		keywords = ['wet', 'mud', 'snow', 'dry', 'rock']
		hike_trail_keywords = []
		if self.conditionDetails is None:
			hike_trail_keywords.append('No Conditions Given')
		else:
			for word in keywords:
				start = self.conditionDetails.find(word)
				if start >= 0:
					hike_trail_keywords.append(word)
			if hike_trail_keywords:
				pass
			else:
				hike_trail_keywords.append('None')

		return hike_trail_keywords

	def get_distance_to_origin(self, UserLocation):
	   # The math module contains a function named 
	   # radians which converts from degrees to radians.
		selected_lat = self.lat
		selected_lon = self.lon
		lon2 = UserLocation.lon
		lat2 = UserLocation.lat
		selected_lon = radians(selected_lon)
		lon2 = radians(lon2)
		selected_lat = radians(selected_lat)
		lat2 = radians(lat2) 
	
		# Haversine formula
		dlon = lon2 - selected_lon
		dlat = lat2 - selected_lat
		a = sin(dlat / 2)**2 + cos(selected_lat) * cos(lat2) * sin(dlon / 2)**2
		c = 2 * asin(sqrt(a))
		# Radius of earth in kilometers. Use 3956 for miles
		r = 6371
		kilometers = c * r
		miles = round((kilometers * 0.62137),2)

		# calculate the result
		return miles 


class BikeTrail:
	'''
	This will store all of our Bike Trail data we get from our JSON file through the MTB get-trails
	API.  Also will calculate distance to origin
	'''

	def __init__(self, id, name, conditionStatus, conditionDetails, conditionDate, rating, lat, lon, difficulty):
		self.id = id
		self.name = name
		self.conditionStatus = conditionStatus
		self.conditionDetails = conditionDetails
		self.conditionDate = conditionDate
		self.rating = rating
		self.lat = lat
		self.lon = lon
		self.difficulty = difficulty

	def get_bike_condition_keywords(self):
		# Looking for keywords that might impact trail conditions.
		# i.e. if it is muddy - then most likely it will still be muddy no matter the weather.
		# if the conditionDetails parameter is None - it returns no condtions given.
		keywords = ['wet', 'mud', 'snow', 'dry', 'rock']
		bike_trail_keywords = []
		if self.conditionDetails is None:
			bike_trail_keywords.append('No Conditions Given')
		else:
			for word in keywords:
				start = self.conditionDetails.find(word)
				if start >= 0:
					bike_trail_keywords.append(word)
			if bike_trail_keywords:
				pass
			else:
				bike_trail_keywords.append('None')

		return bike_trail_keywords

	# to calculate the distance between the trail location and the location that the user entered.
	def get_distance_to_origin(self, UserLocation):
	   # The math module contains a function named 
	   # radians which converts from degrees to radians.
		selected_lat = self.lat
		selected_lon = self.lon
		lon2 = UserLocation.lon
		lat2 = UserLocation.lat
		selected_lon = radians(selected_lon)
		lon2 = radians(lon2)
		selected_lat = radians(selected_lat)
		lat2 = radians(lat2) 
	
		# Haversine formula
		dlon = lon2 - selected_lon
		dlat = lat2 - selected_lat
		a = sin(dlat / 2)**2 + cos(selected_lat) * cos(lat2) * sin(dlon / 2)**2
		c = 2 * asin(sqrt(a))
		# Radius of earth in kilometers. Use 3956 for miles
		r = 6371
		kilometers = c * r
		miles = round((kilometers * 0.62137),2)

		# calculate the result
		return miles 


class YesterdayWeather:

	def __init__(self, precip_prob, precip_type, temperature, wind_speed, summary, humidity):
		self.precip_prob = precip_prob
		self.temperature = temperature
		self.wind_speed = wind_speed
		self.summary = summary
		self.humidity = humidity
		self.precip_type = precip_type


	def get_current_precip(self):
		if self.precip_prob > 66.6 and self.precip_type == 'rain':
			return 'Wet'
		elif self.precip_prob > 66.6 and self.precip_type == 'snow':
			return 'Cold Wet'
		elif (33.33 < self.precip_prob <= 66.6) and self.precip_type == 'rain':
			return 'Damp'
		elif (33.33 < self.precip_prob <= 66.6) and self.precip_type == 'snow':
			return 'Cold Damp'
		else:
			return 'Dry'


def get_hike_trails(lat, lon, maxDistance, key):
    # Get all the trails within a given distance from the user.
    # this will return a list of Hike Trail Classes.
	
    #Uncomment this for live API version.  This is commented out so that we can save our API requests	
    request = requests.get(f'http://www.hikingproject.com/data/get-trails?lat={lat}&lon={lon}&maxDistance={maxDistance}&key={key}&maxResults=20')	
    trails_text = request.text
    trails_dict = json.loads(trails_text)
    trails_json = trails_dict['trails']
    updated_trails_dict = {}
    for index, trail in enumerate(trails_json):
        weather = get_location_data(lat=trail['latitude'], lon=trail['longitude'])
        trail['temperature'] = weather['currently']['temperature']
        trail['weather_summary'] = weather['currently']['summary']
        updated_trails_dict.update({index: trail})

    return updated_trails_dict 
	
	# Loading in our Trail Data test so we can play around with html without making api requests.
	
	# with open('JSON_API_Data/trailsHikeApiData.json') as f:
	# 	trails_dict = json.load(f)

	#trails = []

	## grab out keys in the JSON output for each variable and store the key-values into our trails class.
	## we will then store all of our classes as objects in our trails lists for later use.
	#for t in trails_dict['trails']:
	#	name = t['name']
	#	id = t['id']
	#	conditionStatus = t['conditionStatus']
	#	conditionDate = t['conditionDate']
	#	try:
	#		conditionDetails = t['conditionDetails'].lower()
	#	except:
	#		conditionDetails = t['conditionDetails']			
	#	rating = t['stars']
	#	lat = t['latitude']
	#	lon = t['longitude']
	#	difficulty = t['difficulty']
	#	trail = BikeTrail(id=id, name=name, conditionStatus=conditionStatus, conditionDetails=conditionDetails, conditionDate=conditionDate,
	#				rating=rating, lat=lat, lon=lon, difficulty=difficulty)
	#	trails.append(trail)
	#
	#return trails


def get_bike_trails(lat, lon, maxDistance, key):
    # Get all the trails within a given distance from the user.
    # this will return a list of Bike Trail Classes.
    # Parse our JSON output
	
    #Uncomment this for live API version.  This is commented out so that we can save our API requests
	
    request = requests.get(f'http://www.mtbproject.com/data/get-trails?lat={lat}&lon={lon}&maxDistance={maxDistance}&key={key}&maxResults=20')	
    trails_text = request.text
    trails_dict = json.loads(trails_text)
    trails_json = trails_dict['trails']
    updated_trails_dict = {}
    for index, trail in enumerate(trails_json):
        weather = get_location_data(lat=trail['latitude'], lon=trail['longitude'])
        trail['temperature'] = weather['currently']['temperature']
        trail['weather_summary'] = weather['currently']['summary']
        updated_trails_dict.update({index: trail})

    return updated_trails_dict 
	# Loading in our Trail Data test so we can play around with html without making api requests.
	
	# with open('JSON_API_Data/trailsBikeApiData.json') as f:
	# 	trails_dict = json.load(f)

	# trails = []

	# grab out keys in the JSON output for each variable and store the key-values into our trails class.
	# we will then store all of our classes as objects in our trails lists for later use.
	# for t in trails_dict['trails']:
	# 	name = t['name']
        #	id = t['id']
        #	conditionStatus = t['conditionStatus']
	#       conditionDate = t['conditionDate']
	#       try:
	#           conditionDetails = t['conditionDetails'].lower()
	#       except:
	#           conditionDetails = t['conditionDetails']			
	#       rating = t['stars']
	#       lat = t['latitude']
	#       lon = t['longitude']
	#       difficulty = t['difficulty']
	#       trail = BikeTrail(id=id, name=name, conditionStatus=conditionStatus, conditionDetails=conditionDetails, conditionDate=conditionDate,
	#               rating=rating, lat=lat, lon=lon, difficulty=difficulty)
	#       trails.append(trail)
	
	#       return trails

def get_coords(address, key):
	# Turns our user's address into latitude and longitude that can be passed to our get_trails function
	# so we can query all the trails within a given distance 
	
	gmaps = googlemaps.Client(key=key)
	geocode_result = gmaps.geocode(address)
	lat = geocode_result[0]['geometry']['location']['lat']
	lon = geocode_result[0]['geometry']['location']['lng']
	user_loc = UserLocation(lat, lon)
	
	return user_loc	
	# return lat, lon


def get_location_data(lat, lon):
	# this function takes latitude and longitude data and returns a dictionary of weather data for the given area
	# we want to pass the lat and lon of the individual trails that are return from our get_trails function.
	
	# we use the ceil function with today's time value because it returns a fractional value, which we don't need for precision 
	# as, we don't need a fraction of a second accuracy for this.
	t = ceil(time.time())

	# Uncooment two lines below when fix is ready.  This saves the number of api requests made when styling our html documents.
	request = requests.get(f'https://api.darksky.net/forecast/{config.weather_api_key}/{lat},{lon},{t}')
	weather_dicts = json.loads(request.text)
	
	# open our pre-made weather data so we can work on styling our html.
	# with open('JSON_API_Data/weatherApiData.json') as f:
	# 	weather_dicts = json.load(f)
	
	return weather_dicts


# create the address that is readable by google maps from the users input
def create_address(road_num, town, state, zipcode):
	address_list = [road_num, town, state, zipcode]
	addr = ",".join(address_list)
	return addr


# returns a list of the states in the US
def get_states():
	states = [
		'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
		'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
		'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
		'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 
		'Mississippi', 'Missouri', 'Montana', 'Nebraska', 
		'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 
		'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 
		'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 
		'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 
		'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	]
	return states


@app.route('/v1/bike/<string:roadNum>/<string:city>/<string:state>/<string:zipcode>/<string:distance>', methods=['GET'])
def getBikeAPI(roadnum, city, state, zipcode, distance):
    user_address = create_address(roadnum, city, state, zipcode)
    user_distance = distance
    try:
        user_loc = get_coords(user_address, config.google_maps_key)
        trail_list = get_bike_trails(lat=user_loc.lat, lon=user_loc.lon, maxDistance=user_distance, key=config.mtb_api_key)
        return trail_list
    except:
        return {}

@app.route('/v1/hike/<string:roadnum>/<string:city>/<string:state>/<string:zipcode>/<string:distance>', methods=['GET'])
def getHikeAPI(roadnum, city, state, zipcode, distance):
    user_address = create_address(roadnum, city, state, zipcode)
    user_distance = distance
    try:
        user_loc = get_coords(user_address, config.google_maps_key)
        trail_list = get_hike_trails(lat=user_loc.lat, lon=user_loc.lon, maxDistance=user_distance, key=config.mtb_api_key)
        return trail_list
    except:
        return {}


@app.route('/')
def home():
	return render_template('home.html')

@app.route('/bike')
def get_bike():
	states = get_states()
	return render_template('bike.html', states=states)

@app.route('/hike')
def get_hike():
	states = get_states()
	return render_template('hike.html', states=states)

@app.route('/bike_trails', methods=['POST'])
def bike_trail_search():
	user_address = create_address(request.form['inputRoadNum'], town=request.form['inputCity'], state=request.form['inputState'],
					zipcode=request.form['inputZip'])
	user_distance = request.form['Distance']
	try:
		user_loc = get_coords(user_address, config.google_maps_key)
		trail_list = get_bike_trails(lat=user_loc.lat, lon=user_loc.lon, maxDistance=user_distance, key=config.mtb_api_key)
		for trail in trail_list:
			trail_weather_json = get_location_data(lat=trail.lat, lon=trail.lon)
			trail.temperature = trail_weather_json['currently']['temperature']
			trail.weather_summary = trail_weather_json['currently']['summary']
		return render_template('bike_trails.html', trails=trail_list, user_loc=user_loc, user_distance=user_distance)
	except:
		return redirect(url_for('get_bike'))

@app.route('/hike_trails', methods=['POST'])
def hike_trail_search():
	user_address = create_address(request.form['inputRoadNum'], town=request.form['inputCity'], state=request.form['inputState'],
					zipcode=request.form['inputZip'])
	user_distance = request.form['Distance']
	try:
		user_loc = get_coords(user_address, config.google_maps_key)
		trail_list = get_hike_trails(lat=user_loc.lat, lon=user_loc.lon, maxDistance=user_distance, key=config.mtb_api_key)
		for trail in trail_list:
			trail_weather_json = get_location_data(lat=trail.lat, lon=trail.lon)
			trail.temperature = trail_weather_json['currently']['temperature']
			trail.weather_summary = trail_weather_json['currently']['summary']		
		return render_template('hike_trails.html', trails=trail_list, user_loc=user_loc, user_distance=user_distance)
	except:
		return redirect(url_for('get_hike'))

if __name__ == '__main__':
    app.run(debug=True)

