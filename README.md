## Minimal Weather by Dan
###### a clean, minimalistic weather app built with React

Utilizing the [MetaWeather API](https://www.metaweather.com/api/), Minimal Weather is able to fetch the current weather of the location based on user input. Weather is depicted and animated utilizing css animations.

#### How To Use
Input a city into the text field (MetaWeather supports most major cities) and press enter or the submit button.

Weather will shortly be displayed. If a city that MetaWeather does not support is entered, an error will be displayed.

*** If you submit without any input, the app will default to San Francisco.

#### Why Two API Calls?

Utilizing Fetch, on submit of the input field, 2 API calls are made to return the weather:
1. The first, to query the Location Search endpoint with the location input string to obtain the woeid (Where On Earth ID) that MetaWeather requires when using their Location Day endpoint in step 2.

```javascript
https://www.metaweather.com/api/location/search/?query=london
```


2. The second, to use the aforementioned woeid to now retrieve the current weather from MetaWeather for the location that the woeid corresponds to.

```javascript
https://www.metaweather.com/api/location/44418/2013/4/27/
```
