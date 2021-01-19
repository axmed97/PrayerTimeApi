'use strict';

var tbody = document.querySelector('tbody');
var latitude, longitude;

window.addEventListener('load', function () {

    var http = new XMLHttpRequest();

    console.log(http.readyState, "Out");

    http.onreadystatechange = () => {
        console.log(http.readyState, "In");
        if (http.readyState == 4) {
            const posted = JSON.parse(http.responseText);
            console.log(posted);

            posted.data.map(function (post) {
                const tr = document.createElement('tr');

                const tdFajr = document.createElement('td');
                tdFajr.innerHTML = post.timings.Fajr + " " + post.date.readable;

                const tdSunrise = document.createElement('td');
                tdSunrise.innerHTML = post.timings.Sunrise + " " + post.date.readable;

                const tdDhuhr = document.createElement('td');
                tdDhuhr.innerHTML = post.timings.Dhuhr + " " + post.date.readable;

                const tdAsr = document.createElement('td');
                tdAsr.innerHTML = post.timings.Asr + " " + post.date.readable;

                const tdSunset = document.createElement('td');
                tdSunset.innerHTML = post.timings.Sunset + " " + post.date.readable;

                tr.appendChild(tdFajr);
                tr.appendChild(tdSunrise);
                tr.appendChild(tdDhuhr);
                tr.appendChild(tdAsr);
                tr.appendChild(tdSunset);

                tbody.appendChild(tr);
            })
        }
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log(latitude, longitude);
            http.open("GET", `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2&month=2&year=2021`);
            http.send();
        })
    }
})