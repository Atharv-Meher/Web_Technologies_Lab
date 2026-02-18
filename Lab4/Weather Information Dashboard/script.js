const API_KEY = "316445396e65564a97d38b5a64158f6d";

const input = document.getElementById("cityInput");
const button = document.getElementById("searchBtn");
const result = document.getElementById("weatherResult");
const errorDiv = document.getElementById("error");
const spinner = document.getElementById("spinner");


// Cache variable
let weatherCache = {};


// Fetch weather function
async function getWeather(city) {

    errorDiv.textContent = "";
    result.innerHTML = "";

    // Check cache first
    if (weatherCache[city]) {

        displayWeather(weatherCache[city]);
        return;
    }

    spinner.style.display = "block";

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${API_KEY}&units=metric`
        );

        if (response.status === 404) {

            throw new Error("City not found");
        }

        if (!response.ok) {

            throw new Error("Network error");
        }

        const data = await response.json();

        spinner.style.display = "none";

        // Store in cache
        weatherCache[city] = data;

        displayWeather(data);

    } catch (error) {

        spinner.style.display = "none";

        errorDiv.textContent = error.message;
    }
}


// Display weather
function displayWeather(data) {

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const condition = data.weather[0].main;
    const city = data.name;

    result.innerHTML = `
        <h3>${city}, India</h3>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Condition: ${condition}</p>
    `;
}


// Button click
button.addEventListener("click", () => {

    const city = input.value.trim();

    if (city === "") {

        errorDiv.textContent = "Enter city name";
        return;
    }

    getWeather(city);
});


// Enter key support
input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

        button.click();
    }
});
