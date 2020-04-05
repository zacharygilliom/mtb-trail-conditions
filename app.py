import config
import googlemaps
import requests
import json
import time
from math import *
from flask import Flask, render_template, request

weather_key = config.weather_api_key
maps_KEY = config.google_maps_key


app = Flask(__name__)

class UserLocation(object):

	def __init__ (self, user_lat, user_lon):
		self.lat = user_lat
		self.lon = user_lon


class Trail:
	"""
	This will store all of our data we get from our JSON file through the MTB get-trails
	API.  Also will calculate distance to origin
	"""

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

	def get_condition_keywords(self):
		# Looking for keywords that might impact trail conditions.
		# i.e. if it is muddy - then most likely it will still be muddy no matter the weather.
		# if the conditionDetails parameter is None - it returns no condtions given.
		keywords = ['wet', 'mud', 'snow', 'dry', 'rock']
		trail_keywords = []
		if self.conditionDetails is None:
			trail_keywords.append('No Conditions Given')
		else:
			for word in keywords:
				start = self.conditionDetails.find(word)
				if start > 0:
					trail_keywords.append(word)
			if trail_keywords:
				pass
			else:
				trail_keywords.append('None')

		return trail_keywords

				

	# to calculate the distance between the trail location and the location that the user entered.
	# TODO need to fix how I get the users input location.

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




def get_trails(lat, lon, maxDistance, key):
	# Get all the trails within a given distance from the user.
	# this will return a list of Instantiated Trail Objects.
	request = requests.get(f'http://www.mtbproject.com/data/get-trails?lat={lat}&lon={lon}&maxDistance={maxDistance}&key={key}')

	# Parse our JSON output
	trails_text = request.text
	trails_dict = json.loads(trails_text)
	trails = []

	# grab out keys in the JSON output for each variable and store the key-values into our trails class.
	# we will then store all of our classes as objects in our trails lists for later use.
	for t in trails_dict['trails']:
		name = t['name']
		id = t['id']
		conditionStatus = t['conditionStatus']
		conditionDate = t['conditionDate']
		conditionDetails = t['conditionDetails']
		rating = t['stars']
		lat = t['latitude']
		lon = t['longitude']
		difficulty = t['difficulty']
		trail = Trail(id=id, name=name, conditionStatus=conditionStatus, conditionDetails=conditionDetails, conditionDate=conditionDate,
					rating=rating, lat=lat, lon=lon, difficulty=difficulty)
		trails.append(trail)

	return trails


def get_location_data(lat, lon):
	# this function takes latitude and longitude data and returns a dictionary of weather data for the given area
	# we want to pass the lat and lon of the individual trails that are return from our get_trails function.  This will
	# return a dictionary of weather data for the givn trail on the previous day(i.e. 86400 is 24 hours prior to today).
	
	# we use the ceil function with today's time value because it returns a fractional value, which we don't need for precision 
	# as, we don't need a fraction of a second accuracy for this.
	t = ceil(time.time())
	t = t - 86400
	request = requests.get(f'https://api.darksky.net/forecast/{weather_key}/{lat},{lon},{t}')
	weather_dicts = json.loads(request.text)
	
	return weather_dicts


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

def get_weather(weath):
	# This function takes a dictionary of our weather data from the get_location_function.
	# this data should be the weather at the location of the specific trail
	temperature = weath['currently']['temperature']
	precip_prob = weath['currently']['precipProbability']
	summ = weath['currently']['summary']
	wind_speed = weath['currently']['windSpeed']
	humidity = weath['currently']['humidity']
	# if there is no precipitation probability, then precipitation type will be None, throwing an error.
	try:
		precip_type = weath['currently']['precipType']
	except:
		precip_type = 'None'

	yest_weather = YesterdayWeather(precip_prob=precip_prob, temperature=temperature, precip_type=precip_type, wind_speed=wind_speed,
					humidity=humidity, summary=summ)

	return yest_weather

def compare_weather_to_trail_condition(trail, weath):
	# We will now compare the keywords of the trail conditionDetails and compare the weather data from the previous day at the 
	# given trail location and write an algorithm to determine the current condition.
	
	# trail_keys is a list of strings of the trail conditions
	trail_keys = trail.get_condition_keywords()

	# weather is a string of what the previous day precipitation was.  Should be a single string.
	weather = weath.get_current_precip()

	trail_current_conditions = []

	for key in trail_keys:
		if key == 'mud' and weather == 'Wet':
			trail_current_conditions.append('Muddy and water puddles')
		if key == 'wet' and weather == 'Wet':
			trail_current_conditions.append('Very wet, could be some mud')
		if key == 'snow' and weather == 'Wet':
			trail_current_conditions.append('Some melted snow and patches of snow')
		if key == 'dry' and weather == 'Wet':
			trail_current_conditions.append('Some moisture on the ground')
		if key == 'rock' and weather == 'Wet':
			trail_current_conditions.append('Slippery Rocks')
		if key == 'None' and weather == 'Wet':
			trail_current_conditions.append('Wet')
		if key == 'mud' and weather == 'Cold Wet':
			trail_current_conditions.append('Cold, stiff mud, and wet')
		if key == 'wet' and weather == 'Cold Wet':
			trail_current_conditions.append('Watch for slush, muddy areas')
		if key == 'snow' and weather == 'Cold Wet':
			trail_current_conditions.append('Wet Snow')
		if key == 'dry' and weather == 'Cold Wet':
			trail_current_conditions.append('Could be some Dry Snow')
		if key == 'rock' and weather == 'Cold Wet':
			trail_current_conditions.append('Slippery Rocks')
		if key == 'None' and weather == 'Cold Wet':
			trail_current_conditions.append('Snow')
		if key == 'mud' and weather == 'Damp':
			trail_current_conditions.append('Muddy')
		if key == 'wet' and weather == 'Damp':
			trail_current_conditions.append('Probably moist and muddy')
		if key == 'snow' and weather == 'Damp':
			trail_current_conditions.append('Wet Snow')
		if key == 'dry' and weather == 'Damp':
			trail_current_conditions.append('Some moisture but probably dry')
		if key == 'rock' and weather == 'Damp':
			trail_current_conditions.append('Slippery Rocks')
		if key == 'None' and weather == 'Damp':
			trail_current_conditions.append('Damp')
		if key == 'mud' and weather == 'Cold Damp':
			trail_current_conditions.append('Muddy')
		if key == 'wet' and weather == 'Cold Damp':
			trail_current_conditions.append('Wet with some snow')
		if key == 'snow' and weather == 'Cold Damp':
			trail_current_conditions.append('Decent amount of snow')
		if key == 'dry' and weather == 'Cold Damp':
			trail_current_conditions.append('Little bit of moisture')
		if key == 'rock' and weather == 'Cold Damp':
			trail_current_conditions.append('Some rocks could be slick')
		if key == 'None' and weather == 'Cold Damp':
			trail_current_conditions.append('Light Snow')
		if key == 'mud' and weather == 'Dry':
			trail_current_conditions.append('Could be some hardened mud spots')
		if key == 'wet' and weather == 'Dry':
			trail_current_conditions.append('Known to be a wet trail, but otherwise should be dry')
		if key == 'snow' and weather == 'Dry':
			trail_current_conditions.append('Mostly Dry, Light Snow')
		if key == 'dry' and weather == 'Dry':
			trail_current_conditions.append('Dry Trail')
		if key == 'rock' and weather == 'Dry':
			trail_current_conditions.append('Dry, Rocky Trail')
		if key == 'None' and weather == 'Dry':
			trail_current_conditions.append('Dry')

	return trail_current_conditions

@app.route('/')
def home():
	return render_template('home.html')

@app.route('/bike')
def get_bike():
	return render_template('bike.html')

@app.route('/hike')
def get_hike():
	return render_template('hike.html')

@app.route('/trails', methods=['POST'])
def trail_search():
	user_address= request.form['Address']
	user_loc = get_coords(user_address, config.google_maps_key)
	trail_list = get_trails(lat=user_loc.lat, lon=user_loc.lon, maxDistance=50, key=config.mtb_api_key)
	for trail in trail_list:
		trail_weather_json = get_location_data(lat=trail.lat, lon=trail.lon)
		trail_weather = get_weather(trail_weather_json)
		trail.conditions = compare_weather_to_trail_condition(trail, trail_weather)
	return render_template('trails.html', trails=trail_list, user_loc=user_loc)

if __name__ == '__main__':
	app.run(debug=True)
	# testing trails out in Boulder CO as these are the most active trails with the most information given.
	# this will get the trail data
	# k, i = get_coords('2520 55th St, Boulder, CO', config.google_maps_key)
