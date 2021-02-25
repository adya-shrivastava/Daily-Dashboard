// var url = 'http://currencyconverter.kowabunga.net/converter.asmx?op=';
import { cors_api_url } from './constant.js';

export function currencyconverter(from, to, date) {
    const payload = `<soap:Envelope xmlns:soap=\"http://www.w3.org/2003/05/soap-envelope\" xmlns:tem=\"http://tempuri.org/\">` +
        `<soap:Header/>` +
        `<soap:Body>` +
        `<tem:GetConversionRate>` +
        `<tem:CurrencyFrom>${from}</tem:CurrencyFrom>` +
        `<tem:CurrencyTo>${to}</tem:CurrencyTo>` +
        `<tem:RateDate>${date}</tem:RateDate>` +
        `</tem:GetConversionRate>` +
        `</soap:Body>` +
        `</soap:Envelope>`;

    const url = 'http://currencyconverter.kowabunga.net/converter.asmx?op=GetConversionRate';

    const request = new XMLHttpRequest();
    request.open('POST', cors_api_url + url, true);

    const msg = document.getElementById('currency-replace');
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                console.log("conversion", request.responseText);

                const parsedXML = parseXML(request.responseText).getElementsByTagName('GetConversionRateResult');
                console.log(parsedXML);

                const htmlReplace = `<p> 1 ${from} = ${parsedXML[0].innerHTML} ${to}</p>`;

                document.getElementById('converted-val').innerHTML = htmlReplace;
            } else {
                msg.innerHTML = "<p>aaaThere is some issue with the request. Please check your request again.</p>"
            }
        } else {}
    }
    request.onerror = () => { msg.innerHTML = "<p>Server Error. Please try again later</p>" }
    request.setRequestHeader('Content-Type', 'text/xml');
    request.send(payload);

}

export function getCurrency(currency, date) {
    const payload = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetCurrencyRate xmlns="http://tempuri.org/">
          <Currency>${currency}</Currency>
          <RateDate>${date}</RateDate>
        </GetCurrencyRate>
      </soap:Body>
    </soap:Envelope>`;

    const url = 'http://currencyconverter.kowabunga.net/converter.asmx?op=GetCurrencyRate';

    const request = new XMLHttpRequest();
    request.open('POST', cors_api_url + url, true);

    const msg = document.getElementById('currency-replace');
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                console.log("current currency", request.responseText);

                const parsedXML = parseXML(request.responseText).getElementsByTagName('GetCurrencyRateResponse')[0].childNodes;
                console.log(parsedXML);

                const htmlReplace = `Today's USD value: ${parsedXML[0].innerHTML}`;
                document.getElementById('currency-h2').style.display = 'block';
                document.getElementById('curr-us').innerHTML = htmlReplace;
                document.getElementById('curr-us').style.display = 'block';
            } else {
                msg.innerHTML = "<p>There is some issue with the request. Please check your request again.</p>"
            }
        } else {}
    }


    request.onerror = () => { msg.innerHTML = "<p>Server Error. Please try again later</p>" }

    request.setRequestHeader('Content-Type', 'text/xml');
    request.send(payload);
}

export function getAllCurrencies() {
    const payload = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <GetCurrencies xmlns="http://tempuri.org/" />
      </soap:Body>
    </soap:Envelope>`;

    const url = 'http://currencyconverter.kowabunga.net/converter.asmx?op=GetCurrencies';

    const request = new XMLHttpRequest();
    request.open('POST', cors_api_url + url, true);

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                console.log("all currencies", request.responseText);
                const parsedXML = parseXML(request.responseText).getElementsByTagName('GetCurrenciesResult')[0].childNodes;
                const selectFrom = document.getElementById('from');
                const selectTo = document.getElementById('to');

                parsedXML.forEach((element, index) => {
                    let optionTag = document.createElement('option');
                    optionTag.value = element.innerHTML;
                    optionTag.textContent = element.innerHTML;
                    selectFrom.appendChild(optionTag);
                });

                parsedXML.forEach((element, index) => {
                    let optionTag = document.createElement('option');
                    optionTag.value = element.innerHTML;
                    optionTag.textContent = element.innerHTML;
                    selectTo.appendChild(optionTag);
                });

                document.getElementById('currency-convert').style.display = 'block';
            }
        }
    }

    request.setRequestHeader('Content-Type', 'text/xml');
    request.send(payload);
}

function parseXML(xmlDoc) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xmlDoc, "application/xml");

    console.log("Parsed string", dom.documentElement.nodeName);
    console.log("Parsed string-----------", dom.documentElement);
    // console.log("data~~~~~~~~", dom.getElementsByTagName('GetCurrenciesResult')[0].childNodes);

    return dom;
}