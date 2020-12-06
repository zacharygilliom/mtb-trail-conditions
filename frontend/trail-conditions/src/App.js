import React, { Component } from 'react';
import './App.css';
import Trails from './components/trails';
import AddressForm from './components/landing';


import  {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

//var bikeURL = 'http://localhost:5000/v1/bike/555%20Bower%20Road/Milton/PA/17847/50'
//var hikeURL = 'http://localhost:5000/v1/hike/555%20Bower%20Road/Milton/PA/17847/50'

var data = [
  {
    "ascent": 1739, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -1738, 
    "difficulty": "black", 
    "high": 1691, 
    "id": 86977, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/143027_medium_1554167399.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/143027_small_1554167399.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/143027_smallMed_1554167399.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/143027_sqsmall_1554167399.jpg", 
    "latitude": 40.5446, 
    "length": 22.3, 
    "location": "Lykens, Pennsylvania", 
    "longitude": -76.6893, 
    "low": 922, 
    "name": "Rattling Creek - IMBA EPIC", 
    "starVotes": 29, 
    "stars": 4, 
    "summary": "Flowy trails punctuated with rock gardens create classic East Coast riding.", 
    "temperature": 60.14, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/86977/rattling-creek-imba-epic", 
    "weather_summary": "Mostly Cloudy"
  }, 
  {
    "ascent": 769, 
    "conditionDate": "2020-09-05 14:01:33", 
    "conditionDetails": "Dry", 
    "conditionStatus": "All Clear", 
    "descent": -737, 
    "difficulty": "blueBlack", 
    "high": 879, 
    "id": 6318965, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/6320256_medium_1554391900.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/6320256_small_1554391900.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/6320256_smallMed_1554391900.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/6320256_sqsmall_1554391900.jpg", 
    "latitude": 40.9597, 
    "length": 5.3, 
    "location": "Mechanicsville, Pennsylvania", 
    "longitude": -76.5753, 
    "low": 508, 
    "name": "Hopewell Park Trails", 
    "starVotes": 9, 
    "stars": 4.3, 
    "summary": "A super flowy trail system that includes a big banana and a tombstone!", 
    "temperature": 61.06, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/6318965/hopewell-park-trails", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 3020, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -3029, 
    "difficulty": "black", 
    "high": 1972, 
    "id": 7016162, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7011278_medium_1554839162.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7011278_small_1554839162.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7011278_smallMed_1554839162.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7011278_sqsmall_1554839162.jpg", 
    "latitude": 41.0019, 
    "length": 35.9, 
    "location": "Mifflinburg, Pennsylvania", 
    "longitude": -77.1961, 
    "low": 1111, 
    "name": "Halfway Dam Epic", 
    "starVotes": 2, 
    "stars": 4.5, 
    "summary": "One epic loop that hits many of the favorites and many of the technically challenging trails.", 
    "temperature": 57.55, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/7016162/halfway-dam-epic", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 1414, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -1419, 
    "difficulty": "black", 
    "high": 1913, 
    "id": 6369289, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/6369995_medium_1554392096.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/6369995_small_1554392096.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/6369995_smallMed_1554392096.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/6369995_sqsmall_1554392096.jpg", 
    "latitude": 40.9892, 
    "length": 22.4, 
    "location": "Mifflinburg, Pennsylvania", 
    "longitude": -77.24, 
    "low": 1403, 
    "name": "Black Gap Figure 8", 
    "starVotes": 3, 
    "stars": 4.3, 
    "summary": "A solid 20-mile loop encompassing some of best trails in North Bald Eagle State Forest.", 
    "temperature": 57.01, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/6369289/black-gap-figure-8", 
    "weather_summary": "Mostly Cloudy"
  }, 
  {
    "ascent": 390, 
    "conditionDate": "2020-08-31 10:16:08", 
    "conditionDetails": "Mostly Dry", 
    "conditionStatus": "All Clear", 
    "descent": -390, 
    "difficulty": "greenBlue", 
    "high": 1126, 
    "id": 7010259, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7034890_medium_1581885290.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7034890_small_1581885290.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7034890_smallMed_1581885290.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7034890_sqsmall_1581885290.jpg", 
    "latitude": 41.1982, 
    "length": 6.5, 
    "location": "Duboistown, Pennsylvania", 
    "longitude": -77.0423, 
    "low": 746, 
    "name": "Raccoon Mountain Beginner Loop", 
    "starVotes": 7, 
    "stars": 4, 
    "summary": "A tour of Mosquito Valley Creek and excellent beginner loop.", 
    "temperature": 60.98, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/7010259/raccoon-mountain-beginner-loop", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 175, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -172, 
    "difficulty": "black", 
    "high": 1991, 
    "id": 6471702, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7021537_medium_1554929073.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7021537_small_1554929073.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7021537_smallMed_1554929073.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7021537_sqsmall_1554929073.jpg", 
    "latitude": 41.2092, 
    "length": 2.7, 
    "location": "Kenmar, Pennsylvania", 
    "longitude": -76.9567, 
    "low": 1863, 
    "name": "Blue Dot Loop", 
    "starVotes": 3, 
    "stars": 4, 
    "summary": "Rocky Singletrack to start, fast flowing hard packed singletrack ending with doubletrack climb.", 
    "temperature": 57.48, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/6471702/blue-dot-loop", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 2268, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -2267, 
    "difficulty": "black", 
    "high": 1864, 
    "id": 5752844, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7025480_medium_1555002944.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7025480_small_1555002944.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7025480_smallMed_1555002944.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7025480_sqsmall_1555002944.jpg", 
    "latitude": 41.0175, 
    "length": 24.2, 
    "location": "Mifflinburg, Pennsylvania", 
    "longitude": -77.1797, 
    "low": 1103, 
    "name": "McCall Dam and Cowbell loop", 
    "starVotes": 1, 
    "stars": 4, 
    "summary": "A solid mix of trail experiences with the least amount of rocks you'll find. (I didn't say none.)", 
    "temperature": 59.2, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/5752844/mccall-dam-and-cowbell-loop", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 2301, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -2300, 
    "difficulty": "blueBlack", 
    "high": 2023, 
    "id": 5988987, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7006255_medium_1554824855.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7006255_small_1554824855.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7006255_smallMed_1554824855.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7006255_sqsmall_1554824855.jpg", 
    "latitude": 40.9787, 
    "length": 24.3, 
    "location": "Avis, Pennsylvania", 
    "longitude": -77.278, 
    "low": 1380, 
    "name": "The Western Territories Ride", 
    "starVotes": 2, 
    "stars": 3.5, 
    "summary": "A great tour of what the Western edge of the Central Mountain Trail System has to offer!", 
    "temperature": 57.43, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/5988987/the-western-territories-ride", 
    "weather_summary": "Mostly Cloudy"
  }, 
  {
    "ascent": 1923, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -1926, 
    "difficulty": "blueBlack", 
    "high": 1995, 
    "id": 4696556, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/4697192_medium_1554328508.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/4697192_small_1554328508.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/4697192_smallMed_1554328508.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/4697192_sqsmall_1554328508.jpg", 
    "latitude": 40.8364, 
    "length": 19.7, 
    "location": "Middleburg, Pennsylvania", 
    "longitude": -77.1927, 
    "low": 1364, 
    "name": "Middle Little", 
    "starVotes": 2, 
    "stars": 3, 
    "summary": "Hitting two classic ridge tops in one ride.", 
    "temperature": 58.03, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/4696556/middle-little", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 1628, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -1628, 
    "difficulty": "black", 
    "high": 1991, 
    "id": 7036833, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7025216_medium_1555002435.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7025216_small_1555002435.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7025216_smallMed_1555002435.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7025216_sqsmall_1555002435.jpg", 
    "latitude": 40.7877, 
    "length": 16.7, 
    "location": "Milroy, Pennsylvania", 
    "longitude": -77.4002, 
    "low": 1286, 
    "name": "Bull Hollow Loop", 
    "starVotes": 1, 
    "stars": 3, 
    "summary": "Bald Eagle gnar and great technical riding out of Bear Gap Picnic Area.", 
    "temperature": 58.79, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/7036833/bull-hollow-loop", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 137, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -132, 
    "difficulty": "blueBlack", 
    "high": 577, 
    "id": 7037604, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7025687_medium_1555003315.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7025687_small_1555003315.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7025687_smallMed_1555003315.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7025687_sqsmall_1555003315.jpg", 
    "latitude": 40.5689, 
    "length": 5.1, 
    "location": "Pine Grove, Pennsylvania", 
    "longitude": -76.3672, 
    "low": 524, 
    "name": "Sweet Arrow Lake Loop", 
    "starVotes": 2, 
    "stars": 2.5, 
    "summary": "A beautiful scenic loop for beginner to intermediate riders.", 
    "temperature": 62.29, 
    "type": "Recommended Route", 
    "url": "https://www.mtbproject.com/trail/7037604/sweet-arrow-lake-loop", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 0, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -305, 
    "difficulty": "black", 
    "high": 1894, 
    "id": 5856844, 
    "imgMedium": "", 
    "imgSmall": "", 
    "imgSmallMed": "", 
    "imgSqSmall": "", 
    "latitude": 41.2166, 
    "length": 1.1, 
    "location": "Montoursville, Pennsylvania", 
    "longitude": -76.9124, 
    "low": 1589, 
    "name": "Muncy Ridge \"A\" Trail", 
    "starVotes": 3, 
    "stars": 5, 
    "summary": "Challenging rocky trail.", 
    "temperature": 58.17, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/5856844/muncy-ridge-a-trail", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 0, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -731, 
    "difficulty": "blue", 
    "high": 1890, 
    "id": 6463870, 
    "imgMedium": "", 
    "imgSmall": "", 
    "imgSmallMed": "", 
    "imgSqSmall": "", 
    "latitude": 41.2152, 
    "length": 1.1, 
    "location": "Kenmar, Pennsylvania", 
    "longitude": -76.943, 
    "low": 1159, 
    "name": "Switchback Trail", 
    "starVotes": 3, 
    "stars": 5, 
    "summary": "A fast descending doubletrack trail with lots of rocks and trees to avoid.", 
    "temperature": 58.34, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/6463870/switchback-trail", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 57, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -366, 
    "difficulty": "black", 
    "high": 1993, 
    "id": 4697656, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/4697138_medium_1554328507.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/4697138_small_1554328507.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/4697138_smallMed_1554328507.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/4697138_sqsmall_1554328507.jpg", 
    "latitude": 40.8085, 
    "length": 3.6, 
    "location": "Middleburg, Pennsylvania", 
    "longitude": -77.3359, 
    "low": 1661, 
    "name": "Little Mountain Trail", 
    "starVotes": 2, 
    "stars": 5, 
    "summary": "One of the most remote trails in the forest, but so worth the effort!", 
    "temperature": 57.73, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/4697656/little-mountain-trail", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 16, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -353, 
    "difficulty": "black", 
    "high": 1397, 
    "id": 7010452, 
    "imgMedium": "", 
    "imgSmall": "", 
    "imgSmallMed": "", 
    "imgSqSmall": "", 
    "latitude": 41.1732, 
    "length": 0.7, 
    "location": "Duboistown, Pennsylvania", 
    "longitude": -77.0666, 
    "low": 1047, 
    "name": "Hiking Trail", 
    "starVotes": 2, 
    "stars": 5, 
    "summary": "A very steep, rocky technical section.", 
    "temperature": 57.87, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/7010452/hiking-trail", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 83, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -113, 
    "difficulty": "black", 
    "high": 1680, 
    "id": 144460, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/143325_medium_1554167424.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/143325_small_1554167424.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/143325_smallMed_1554167424.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/143325_sqsmall_1554167424.jpg", 
    "latitude": 40.5189, 
    "length": 2.4, 
    "location": "Elizabethville, Pennsylvania", 
    "longitude": -76.7765, 
    "low": 1621, 
    "name": "Rock's Ridge", 
    "starVotes": 2, 
    "stars": 5, 
    "summary": "The kind of rocky that's fun to pedal.", 
    "temperature": 58.73, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/144460/rocks-ridge", 
    "weather_summary": "Mostly Cloudy"
  }, 
  {
    "ascent": 30, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -413, 
    "difficulty": "black", 
    "high": 2017, 
    "id": 6000209, 
    "imgMedium": "", 
    "imgSmall": "", 
    "imgSmallMed": "", 
    "imgSqSmall": "", 
    "latitude": 40.9728, 
    "length": 1.3, 
    "location": "Mifflinburg, Pennsylvania", 
    "longitude": -77.2191, 
    "low": 1604, 
    "name": "Yankee Run Trail", 
    "starVotes": 2, 
    "stars": 5, 
    "summary": "One of the best \"found\" trails in the forest!", 
    "temperature": 56.87, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/6000209/yankee-run-trail", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 0, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -438, 
    "difficulty": "black", 
    "high": 1911, 
    "id": 7026887, 
    "imgMedium": "", 
    "imgSmall": "", 
    "imgSmallMed": "", 
    "imgSqSmall": "", 
    "latitude": 41.2044, 
    "length": 0.6, 
    "location": "Kenmar, Pennsylvania", 
    "longitude": -76.9628, 
    "low": 1473, 
    "name": "Shaffers Trail", 
    "starVotes": 2, 
    "stars": 5, 
    "summary": "Rocky downhill with open exposure.", 
    "temperature": 57.7, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/7026887/shaffers-trail", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 1, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -14, 
    "difficulty": "green", 
    "high": 554, 
    "id": 7037727, 
    "imgMedium": "https://cdn2.apstatic.com/photos/mtb/7025687_medium_1555003315.jpg", 
    "imgSmall": "https://cdn2.apstatic.com/photos/mtb/7025687_small_1555003315.jpg", 
    "imgSmallMed": "https://cdn2.apstatic.com/photos/mtb/7025687_smallMed_1555003315.jpg", 
    "imgSqSmall": "https://cdn2.apstatic.com/photos/mtb/7025687_sqsmall_1555003315.jpg", 
    "latitude": 40.5696, 
    "length": 0.1, 
    "location": "Pine Grove, Pennsylvania", 
    "longitude": -76.365, 
    "low": 540, 
    "name": "Waterfall Trail", 
    "starVotes": 1, 
    "stars": 5, 
    "summary": "The trail to see the beautiful waterfall.", 
    "temperature": 62.3, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/7037727/waterfall-trail", 
    "weather_summary": "Overcast"
  }, 
  {
    "ascent": 176, 
    "conditionDate": "1970-01-01 00:00:00", 
    "conditionDetails": null, 
    "conditionStatus": "Unknown", 
    "descent": -99, 
    "difficulty": "blue", 
    "high": 1697, 
    "id": 7010493, 
    "imgMedium": "", 
    "imgSmall": "", 
    "imgSmallMed": "", 
    "imgSqSmall": "", 
    "latitude": 41.078, 
    "length": 1.3, 
    "location": "Watsontown, Pennsylvania", 
    "longitude": -77.087, 
    "low": 1564, 
    "name": "5 Points Trail", 
    "starVotes": 1, 
    "stars": 5, 
    "summary": "Fast and flowy with some nice rocky sections.", 
    "temperature": 57.67, 
    "type": "Trail", 
    "url": "https://www.mtbproject.com/trail/7010493/5-points-trail", 
    "weather_summary": "Overcast"
  }
]

/*
class App extends Component {
	state = {
		trails: data 
	};
	
	//componentDidMount() {
	//	fetch(targetURL)
	//	.then(res => res.json())
	//	.then((data) => { 
			//console.log(data)
	//		this.setState({ trails: data });
	//	})
	//	.catch(console.log);
	//}
	render () {
		return (
			<Trails trails={this.state.trails} />
		)
	}
}
*/
class App extends Component{
	state = {
		trails: data
	};
	render () {
	return (
		<Router>
			<div className="top-home">
				<div className="top-bar">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/bike">Bike</Link>
						</li>
						<li>
							<Link to="/hike">Hike</Link>
						</li>
					</ul>
				</div>
				<div>
			<Switch>
					<Route exact path="/">
						<Home />
					</Route>
					<Route path="/bike">
						<Bike trails={this.state.trails}/>
					</Route>
					<Route path="/hike">
						<Hike trails={this.state.trails}/>
					</Route>
				</Switch>
			</div>
			</div>
		</Router>
	);
};
}

class Home extends Component{
	render () {
	return (
		<AddressForm />
	);
};
}
class Bike extends Component {
	render () {
	return (
		<Trails trails={this.props.trails} />
	);
};
}

class Hike extends Component {
	render () {
	return (
		<Trails trails={this.props.trails} />
	);
};
}

export default App;
