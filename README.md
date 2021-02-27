## Daily Dashboard
### Web Services Application
#### Author: Adya Shrivastava

<br/>

For the web application, I built a dashboard for the users wherein they can check their latest updates such as current weather, number of coronavirus cases, latest USD currency value. The user would be required to enter the zip code based on which all of the details would be fetched. Also, the user can choose to convert currencies of any two countries.

### Features

The web application implements the following features:
1.	Fetch the city and state from the input zip code.
2.	Fetch the current weather from the zip code.
3.	Display the count of current coronavirus cases from the zip code entered.
4.	Display today’s USD amount 
5.	Convert between currencies of any two countries.


### API's used:
For the purpose of this web application, the following web services were used:

1. **Find state and city on basis of ZipCode (REST):** https://www.zipcodeapi.com/API <br/>
The service is a REST service and given a zip code, the API returns information such as city, state, longitude, latitude, timezone among other information. The web application used city, state, and timezone information to display on the user’s dashboard.

2. **Current weather updates (REST):** https://openweathermap.org/api <br/>
This REST API from openweathermap.org returns weather data for many locations. I used the current weather data API from the collection of all the APIs offered. The current weather data API returns longitude, latitude, weather, timezone, wind, country among all other information. I used ‘weather.main’, ‘weather.description’, ‘weather.icon’, ‘name’, ‘sys.country’, ‘main.temp’, and ‘main.feels_like’ fields. Full details about the response fields can be found here: https://openweathermap.org/current#current_JSON 


3. **CoronaVirus updates (REST):** https://anypoint.mulesoft.com/exchange/68ef9520-24e9-4cf2-b2f5-620025690913/covid19-data-tracking-api/ <br/>
This REST API provided by MuleSoft is an excellent source to get the latest COVID-19 information by zip code. Amongst the collection of APIs provided by MuleSoft, I chose the one with New York Times as the data source since it is the most updated source. Given a zip code, the API returns information such as box coordinates of longitude and latitude, and death count, and positive count per county. I used the information about the death count and positive county for the given zip code to display on the user’s dashboard. 
In addition, this REST API also provides a way to access the past 7 days' information for the zip code which is displayed on the dashboard for a more comprehensive view for the user.

4. **Currency conversion (SOAP):** http://currencyconverter.kowabunga.net/converter.asmx <br/>
This is a SOAP API that I used for displaying currency-related information on the user’s dashboard. This SOAP API supports various operations for different tasks. Some of those operations include GetConversionAmount, GetConversionRate, GetCultureInfo, GetCurrencies, GetCurrencyRate, GetCurrencyRates, and GetLastUpdateDate. Amongst all the operations provided I used the GetCurrencies, GetCurrencyRate and GetConversionRate.

<br/>

### How to use the application:

#### Pre-requisites:
- NPM should be installed. If not, install it from [here](https://nodejs.org/en/).
- Verify the installations by running `node -v` and `npm -v` from command line.

#### Steps to Run:

- Install [http-server](https://www.npmjs.com/package/http-server) by running: `npm install http-server -g`
- cd into the directory where the project is saved.
- Start the http-server by running `http-server -o`. This will open a browser window at: `http://127.0.0.1:8080/`


### References:
1.	OpenWeather Map API -  https://openweathermap.org/api
2.	CurrencyConverter API -  http://currencyconverter.kowabunga.net/converter.asmx
3.	MuleSoft Anypoint public Covid API -  https://anypoint.mulesoft.com/exchange/68ef9520-24e9-4cf2-b2f5-620025690913/covid19-data-tracking-api/
