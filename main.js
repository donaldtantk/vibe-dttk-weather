
class WeatherCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const date = this.getAttribute('date');
        const temperature = this.getAttribute('temperature');
        const weathercode = parseInt(this.getAttribute('weathercode'));

        const { description, icon, color } = this.getWeatherInfo(weathercode);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    font-family: 'Helvetica Neue', sans-serif;
                }
                .card {
                    background-color: ${color};
                    color: white;
                    padding: 1rem;
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }
                .icon {
                    font-size: 4rem;
                }
                p {
                    margin: 0.5rem 0;
                }
                .card.dark-text {
                    color: #333;
                }
            </style>
            <div class="card ${this.useDarkText(color) ? 'dark-text' : ''}">
                <p><b>${date}</b></p>
                <div class="icon">${icon}</div>
                <p>${temperature}°C</p>
                <p>${description}</p>
            </div>
        `;
    }

    useDarkText(bgColor) {
        // Simple check to see if the background is light enough to need dark text
        const lightColors = ['#ecf0f1'];
        return lightColors.includes(bgColor);
    }


    getWeatherInfo(code) {
        if (code === 0) return { description: 'Clear sky', icon: '☀️', color: '#3498db' };
        if (code >= 1 && code <= 3) return { description: 'Partly cloudy', icon: '⛅️', color: '#95a5a6' };
        if (code === 45 || code === 48) return { description: 'Fog', icon: '🌫️', color: '#bdc3c7' };
        if (code >= 51 && code <= 57) return { description: 'Drizzle', icon: '🌧️', color: '#5dade2' };
        if (code >= 61 && code <= 67) return { description: 'Rain', icon: '🌧️', color: '#2980b9' };
        if (code >= 71 && code <= 77) return { description: 'Snow', icon: '❄️', color: '#ecf0f1' };
        if (code >= 80 && code <= 82) return { description: 'Rain showers', icon: '🌦️', color: '#3498db' };
        if (code >= 85 && code <= 86) return { description: 'Snow showers', icon: '🌨️', color: '#a9cce3' };
        if (code >= 95 && code <= 99) return { description: 'Thunderstorm', icon: '⛈️', color: '#2c3e50' };
        return { description: 'Unknown', icon: '❓', color: '#7f8c8d' };
    }
}

customElements.define('weather-card', WeatherCard);


const locationInput = document.getElementById('location');
const detectLocationButton = document.getElementById('detect-location');
const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const getWeatherButton = document.getElementById('get-weather');
const weatherContainer = document.getElementById('weather-container');
const resetButton = document.getElementById('reset');

detectLocationButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                .then(response => response.json())
                .then(data => {
                    locationInput.value = data.city;
                    getWeatherButton.click();
                })
                .catch(error => {
                    console.error('Error getting city name:', error);
                });
        });
    }
});

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value;
    let startDate = startDateInput.value;
    let endDate = endDateInput.value;

    document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${location})`;
    document.body.classList.add('body-has-bg');

    if (!startDate || !endDate) {
        const today = new Date();
        startDate = today.toISOString().split('T')[0];
        const fourteenDaysLater = new Date();
        fourteenDaysLater.setDate(today.getDate() + 14);
        endDate = fourteenDaysLater.toISOString().split('T')[0];
    }

    if (location) {
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const { latitude, longitude } = data.results[0];
                    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max&start_date=${startDate}&end_date=${endDate}`)
                        .then(response => response.json())
                        .then(weatherData => {
                            weatherContainer.innerHTML = '';
                            for (let i = 0; i < weatherData.daily.time.length; i++) {
                                const weatherCard = document.createElement('weather-card');
                                weatherCard.setAttribute('date', weatherData.daily.time[i]);
                                weatherCard.setAttribute('temperature', weatherData.daily.temperature_2m_max[i]);
                                weatherCard.setAttribute('weathercode', weatherData.daily.weathercode[i]);
                                weatherContainer.appendChild(weatherCard);
                            }
                        });
                } else {
                    weatherContainer.innerHTML = '<p>Location not found</p>';
                }
            });
    } else {
        weatherContainer.innerHTML = '<p>Please enter a location</p>';
    }
});

resetButton.addEventListener('click', () => {
    locationInput.value = '';
    startDateInput.value = '';
    endDateInput.value = '';
    weatherContainer.innerHTML = '';
    document.body.style.backgroundImage = '';
    document.body.classList.remove('body-has-bg');
});
