
# Weather Forecast Web Application

## Overview

This web application displays the weather forecast for a user-specified location and date range. The user can either manually enter their location or allow the browser to detect it automatically. The application fetches data from a public weather API and presents it in a user-friendly format. The background of the application will dynamically change to an iconic photo of the entered location.

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
*   **Dynamic Background:** The application background displays an image related to the entered location.

## Design and Styling

*   **Layout:** A clean and modern single-page layout.
*   **Typography:** Clear and readable fonts.
*   **Color Palette:** A modern and vibrant color scheme with a premium, tactile feel.
*   **Dynamic Background:** The background of the page displays a high-quality image of the location, creating an immersive experience.
*   **Components:**
    *   **Location/Date Input Form:** A simple and intuitive form for user input.
    *   **Weather Display:** A section to display the fetched weather data using cards for each day's forecast with graphical and color-coded infographics.
*   **Responsiveness:** The application is designed to be responsive and work on various screen sizes.

## Technical Implementation

*   **Frontend:** HTML, CSS, and JavaScript (ES Modules).
*   **Weather API:** [Open-Meteo API](https://open-meteo.com/) (no API key required for non-commercial use).
*   **Image API:** [Unsplash Source](https://source.unsplash.com/) for dynamic background images.
*   **Web Components:** A custom element (`<weather-card>`) will be created to display the forecast for a single day.

## Current Plan

1.  **Update the JavaScript (`main.js`):**
    *   When fetching weather, also fetch an image from Unsplash Source based on the location.
    *   Dynamically set the background image of the page.
    *   Update the reset functionality to also reset the background image.
2.  **Update the CSS (`style.css`):**
    *   Add styles to the `body` to properly display the background image (e.g., `background-size: cover`).
    *   Add a semi-transparent overlay to ensure text remains readable over the background image.
