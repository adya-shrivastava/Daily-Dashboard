import { apiKey, cors_api_url } from "./constant.js";
import getWeather from './weather.js';
import getCoronaCases from "./corona.js";
import { currencyconverter, getAllCurrencies, getCurrency } from './currency.js';


const currentDate = new Date();
const c_date = String(currentDate.getDate()).padStart(2, '0');
const m_date = String(currentDate.getMonth() + 1).padStart(2, '0');
const year = currentDate.getFullYear();

const formatDate = `${year}-${m_date}-${c_date}`;
console.log("TODAY", formatDate);

document.addEventListener("DOMContentLoaded", function(event) {
    const form = document.getElementById("inputForm");
    const input = document.getElementById("zipcode");
    const msg = document.querySelector(".msg");

    form.addEventListener("submit", event => {
        event.preventDefault();
        const zipcode = input.value;

        console.log(zipcode);

        const url = `https://www.zipcodeapi.com/rest/${apiKey}/info.json/${zipcode}/degrees`;
        console.log(url);

        var request = new XMLHttpRequest();
        request.open('GET', cors_api_url + url, true);
        request.onload = () => {
            if (request.status === 200) {
                const response = JSON.parse(request.response);
                console.log(response);
                console.log(response["city"], response["state"]);
                const city = response["city"];
                const state = response["state"];
                const timezone = response["timezone"]["timezone_abbr"];
                msg.innerHTML = `<p>You are currently in ${city}, ${state}. Timezone: ${timezone}</p>`;

                // document.getElementById('weather-front').style.display = 'none';
                if (document.getElementById("weatherImage")) {
                    document.getElementById('weatherImage').remove();
                }
                if (document.getElementById('coronaImage')) {
                    document.getElementById('coronaImage').remove();
                }
                if (document.getElementById('currencyImage')) {
                    document.getElementById('currencyImage').remove();
                }

                getWeather(zipcode);
                getCoronaCases(zipcode);
                getCurrency("USD", formatDate);
                getAllCurrencies();
                // manageCurrencies(formatDate);

            } else {
                msg.innerHTML = "<p>Please enter a valid zip code</p>";
            }
        };

        request.onerror = () => { msg.innerHTML = "<p>Please try again later" }
        request.addEventListener('progress', () => {
            msg.innerHTML = "<p>Loading... Please wait</p>"
        });
        request.onprogress = () => {
            msg.innerHTML = "<p>Loading... Please wait</p>";
        }
        request.send();
    })

    document.getElementById('convertBtn').addEventListener("click", () => {
        const from = document.getElementById('from').value;
        const to = document.getElementById('to').value;

        console.log(from, to, '~~~~~~~~~~+++');

        currencyconverter(from, to, formatDate);
    })



});