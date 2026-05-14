
# Weather Forecast Web Application

## Overview

This web application displays the weather forecast for a user-specified location and date range. The user can either manually enter their location or allow the browser to detect it automatically. The application fetches data from a public weather API and presents it in a user-friendly format.

## Features

*   **Location Input:**
    *   Manual input of a city name.
    *   Automatic location detection using the browser's Geolocation API.
*   **Date Range Selection:**
    *   Start and end date selection for the forecast period.
    *   Defaults to the next 14 days if no dates are provided.
*   **Weather Data Display:**
    *   Fetches and displays weather forecast data.
    *   The data is presented in a clear and organized manner.
*   **Reset Functionality:** A reset button to clear all inputs and results.

## Design and Styling

*   **Layout:** A clean and modern single-page layout.
*   **Typography:** Clear and readable fonts.
*   **Color Palette:** A modern and vibrant color scheme with a premium, tactile feel.
*   **Components:**
    *   **Location/Date Input Form:** A simple and intuitive form for user input.
    *   **Weather Display:** A section to display the fetched weather data using cards for each day's forecast with graphical and color-coded infographics.
*   **Responsiveness:** The application is designed to be responsive and work on various screen sizes.

## Technical Implementation

*   **Frontend:** HTML, CSS, and JavaScript (ES Modules).
*   **Weather API:** [Open-Meteo API](https://open-meteo.com/) (no API key required for non-commercial use).
*   **Web Components:** A custom element (`<weather-card>`) will be created to display the forecast for a single day.

## Current Plan

1.  **Update the HTML (`index.html`):**
    *   Add a reset button to the input container.
2.  **Update the CSS (`style.css`):**
    *   Implement a modern color scheme using CSS variables.
    *   Add styles for the new reset button.
    *   Enhance the visual design with better spacing, shadows, and a background texture.
    *   Add styles for weather condition infographics within the weather cards.
3.  **Update the JavaScript (`main.js`):**
    *   Implement the reset functionality to clear input fields and the weather display.
    *   Modify the `WeatherCard` component to include graphical representations of weather (e.g., icons and color-coding).
