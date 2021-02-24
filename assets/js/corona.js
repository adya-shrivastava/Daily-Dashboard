import { cors_api_url } from './constant.js';


export default function getCoronaCases(zipCode) {
    const url = `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7`;

    console.log("Corona URL", url);
    var request = new XMLHttpRequest();
    request.open('GET', cors_api_url + url, true);

    const msg = document.getElementById('corona-replace');
    request.onload = () => {
        if (request.status === 200) {
            const response = JSON.parse(request.response);
            console.log(response);

            const counties = response["counties"][0];
            const countyName = counties["countyName"];
            const historicData = counties["historicData"];

            var details = "";

            historicData.forEach(element => {
                const row = `
                        <tr>
                            <th>${element.date}</th>
                            <th>${element.deathCt}</th>
                            <th>${element.positiveCt}</th>
                        </tr>`;

                details = details + row;
            });

            const htmlReplace = `<div><h2>Corona virus status in the last 6 days:</h2>
                <table style = "margin: 60px;margin-top:30px">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Positive Count</th>
                            <th>Death Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${details}
                    </tbody>
                </table></div>`;

            document.getElementById("corona-replace").innerHTML = htmlReplace;
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