import { cors_api_url, weatherApi } from './constant.js';


export default function getWeather(zipCode) {
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${weatherApi}&units=metric`;

    var request = new XMLHttpRequest();
    request.open('GET', cors_api_url + url, true);
    const msg = document.getElementById('weather-replace');

    request.onload = () => {
        if (request.status === 200) {
            const response = JSON.parse(request.response);

            const main = response["weather"]["main"];
            const description = response["weather"][0]["description"];
            const icon = response["weather"][0]["icon"];
            const city = response["name"];
            const country = response["sys"]["country"];
            const temp = response["main"]["temp"];
            const feels_like = response["main"]["feels_like"];

            const htmlReplace = `<div><h2 class='weather-city'>Weather for 
                    <span>${city}, ${country}</span>
                </h2>
                <div class='weather-temp'>Temperature: ${Math.round(temp)}<sup>°C</sup></div>
                <div class='weather-temp'>Feels like: ${Math.round(feels_like)}<sup>°C</sup></div>
                <div>
                    <img class='weather-icon' src=https://openweathermap.org/img/wn/${icon}@2x.png alt=${main}>
                    <div>Forecast is: ${description}</div>
                </div></div>`;

            document.getElementById('weather-replace').innerHTML = htmlReplace;
        } else {
            msg.innerHTML = "<p>There is some issue with the request. Please check your request again.</p>"
        }
    }

    request.onerror = () => { msg.innerHTML = "<p>Server Error. Please try again later</p>" }
    request.addEventListener('progress', () => {
        msg.innerHTML = "<p>Loading... Please wait</p>"
    });
    request.onprogress = () => {
        msg.innerHTML = "<p>Loading... Please wait</p>";
    }
    request.send();
}