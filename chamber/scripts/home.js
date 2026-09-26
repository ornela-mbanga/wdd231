const latitude = -4.2634;
const longitude = 15.2429;

// ==========================================
// WEATHER
// ==========================================

async function getWeather() {
    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,weather_code` +
        `&daily=weather_code,temperature_2m_min,temperature_2m_max` +
        `&forecast_days=3` +
        `&timezone=Africa%2FBrazzaville`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to load weather data.");
        }

        const data = await response.json();

        // Current weather
        const currentTemperature =
            Math.round(data.current.temperature_2m);

        const currentWeather =
            getWeatherDescription(data.current.weather_code);

        document.querySelector("#current-weather").innerHTML = `
            <p>
                <strong>Temperature:</strong>
                ${currentTemperature}°C
            </p>

            <p>
                <strong>Conditions:</strong>
                ${currentWeather}
            </p>
        `;

        // Three-day forecast
        const forecastContainer =
            document.querySelector("#forecast");

        forecastContainer.innerHTML = "";

        for (let i = 0; i < 3; i++) {
            const date = new Date(data.daily.time[i]);

            const dayName = date.toLocaleDateString("en-US", {
                weekday: "long"
            });

            const minTemperature =
                Math.round(data.daily.temperature_2m_min[i]);

            const maxTemperature =
                Math.round(data.daily.temperature_2m_max[i]);

            const weatherDescription =
                getWeatherDescription(data.daily.weather_code[i]);

            const card = document.createElement("article");

            card.classList.add("forecast-card");

            card.innerHTML = `
                <h3>${dayName}</h3>

                <p>${weatherDescription}</p>

                <p>
                    <strong>Low:</strong>
                    ${minTemperature}°C
                </p>

                <p>
                    <strong>High:</strong>
                    ${maxTemperature}°C
                </p>
            `;

            forecastContainer.appendChild(card);
        }

    } catch (error) {
        console.error("Weather error:", error);

        document.querySelector("#current-weather").innerHTML = `
            <p>Weather information is currently unavailable.</p>
        `;

        document.querySelector("#forecast").innerHTML = `
            <p>Forecast information is currently unavailable.</p>
        `;
    }
}


// ==========================================
// WEATHER DESCRIPTION
// ==========================================

function getWeatherDescription(code) {
    if (code === 0) return "☀️ Clear sky";
    if (code === 1 || code === 2) return "🌤️ Partly cloudy";
    if (code === 3) return "☁️ Cloudy";
    if (code >= 45 && code <= 48) return "🌫️ Fog";
    if (code >= 51 && code <= 67) return "🌧️ Rain";
    if (code >= 71 && code <= 77) return "❄️ Snow";
    if (code >= 80 && code <= 82) return "🌦️ Rain showers";
    if (code >= 95) return "⛈️ Thunderstorm";

    return "Weather conditions unavailable";
}


// ==========================================
// COMPANY SPOTLIGHTS
// ==========================================

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json.");
        }

        const members = await response.json();

        // 2 = Silver, 3 = Gold
        const qualifiedMembers = members.filter(
            member =>
                member.membership === 2 ||
                member.membership === 3
        );

        // Randomize members
        const shuffledMembers = qualifiedMembers.sort(
            () => Math.random() - 0.5
        );

        // Select 3 members
        const selectedMembers = shuffledMembers.slice(0, 3);

        const spotlightContainer =
            document.querySelector("#spotlight-container");

        spotlightContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            const card = document.createElement("article");

            card.classList.add("spotlight-card");

            const membershipLevel =
                member.membership === 3
                    ? "Gold"
                    : "Silver";

            card.innerHTML = `
                <h3>${member.name}</h3>

                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                >

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membershipLevel}
                </p>

                <p>${member.description}</p>

                <p>
                    <a
                        href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Visit Website
                    </a>
                </p>
            `;

            spotlightContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Spotlight error:", error);

        document.querySelector(
            "#spotlight-container"
        ).innerHTML = `
            <p>Business spotlights could not be loaded.</p>
        `;
    }
}


// ==========================================
// START FUNCTIONS
// ==========================================

getWeather();
getSpotlights();