import requests
import config
import json
import googlemaps


weather_key = config.weather_api_key
maps_KEY = config.google_maps_key


def get_coords(address, key):
	gmaps = googlemaps.Client(key=key)
	geocode_result = gmaps.geocode(address)
	lat = geocode_result[0]['geometry']['location']['lat']
	lon = geocode_result[0]['geometry']['location']['lng']

	return  lat, lon

def get_location_data(lat, lon):
	request = requests.get(f'https://api.darksky.net/forecast/{weather_key}/{lat},{lon},1585626375')
	
	# print(request.text)
	weather_dicts = json.loads(request.text)
	print(weather_dicts)


if __name__ == '__main__':

	user_lat, user_lon = get_coords('555 Bower Road, Milton, PA', config.google_maps_key)

	get_location_data(user_lat, user_lon)

