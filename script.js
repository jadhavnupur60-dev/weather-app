const API_KEY = "fdee9e6b571d754ccd2240bd7ef0736d";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            throw new Error(data.message || "Unable to get weather");
        }

        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const cityName = data.name;

        document.getElementById("weatherResult").innerHTML = `
            <h2>${cityName}</h2>

            <img
                class="weather-icon"
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
                alt="${description}"
            >

            <div class="temperature">
                ${temperature}°C
            </div>

            <div class="description">
                ${description}
            </div>
        `;
    } catch (error) {
        console.error(error);

        document.getElementById("weatherResult").innerHTML = `
            <p style="color:red;">
                Error: ${error.message}
            </p>
        `;
    }
}