# Mountain Bike Trail Conditions

A simple web app that aggregates data from MTBProject.com, Hikingproject.com, darksky.net, and google maps.   You can select to view either mountain bike trails or hiking trails.  We use the weather data from darksky.net to get location data about weather conditions at the trails. Currently the project is set up to display 20 results for the number of trails. 

## How to Use
You can clone this repository onto your computer.  You will need API keys for MTBProject.com, Hikingproject.com, and darksky.net.  If you have a google account you can get an API key to access the location data. MTBProject.com and Hikingproject.com are affiliated so you can use the same API key.  You can either hardcode the API key in your request function, or you can create a config.py file and store them in there.  

You can install all the necessary packages by using pip.  I suggest creating a virtualenv for your project

'''python
pip install -r requirements.txt
'''

## How to Customize

If you would like to look at more trails, you can change the requests function to retrieve more.  It is the las argument in the API.

'''
request = requests.get(f'http://www.mtbproject.com/data/get-trails?lat={lat}&lon={lon}&maxDistance={maxDistance}&key={key}&maxResults=20')
'''

There are JSON files of all the outputs from the APIs.  There is more info that is contained in the weather API that you can add to the results table.  You would need to adjust @app.route for the specific webpage to include the info that you would like.

## What's Next?

I will be working on trying to display some more accurate weather info.


