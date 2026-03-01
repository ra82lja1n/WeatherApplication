import { apiKey } from "./api.js";

let searchBtn = document.querySelector("#search-btn");
let resultBox = document.querySelector("#result");

searchBtn.addEventListener("click", async () => {
    let cityName = document.querySelector("#city-name").value.trim();
    resultBox.innerHTML = "";

    if (cityName === "") {
        resultBox.innerHTML = `<h3 style="color:red; text-align:center">Please Enter a City Name</h3>`;
        return;
    }

    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            resultBox.innerHTML = `<h3 style="color:red; text-align:center">City Not Found</h3>`;
            return;
        }

        let data = await response.json();

        resultBox.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <hr><br>
            <h3>Temperature: ${data.main.temp} °C</h3>
            <h3>Wind Speed: ${data.wind.speed} m/s</h3>
            <h3>Humidity: ${data.main.humidity} %</h3>
        `;
    } catch (error) {
        console.error("Error in Fetching Data", error);
    }
});