// script.js
document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const display = document.getElementById('weather-display');

    try {
        const response = await fetch(`/weather?city=${city}&state=${state}`);
        const data = await response.json();

        if (data.error) {
            display.innerHTML = `<p>${data.error}</p>`;
            return;
        }

    const iconPath = `icons/${data.condition}.svg`;

    display.innerHTML = `
        <p>Temperature: ${data.temperature} °F</p>
        <p>Condition: ${data.description}</p>
        <p>Wind Speed: ${data.wind_speed} mph</p>
        <img src="${iconPath}" alt="${data.condition} icon">
    `;

    document.body.className = data.condition;
    } catch (error) {
    display.innerHTML = `<p>Failed to fetch weather data.</p>`;
    }
});