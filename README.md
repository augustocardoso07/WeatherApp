# Weather App

A simple weather application built with React Native and TypeScript that displays current weather and hourly forecast for any city.

## Features

- Search weather by city name
- Display current weather conditions
- Show 5-hour forecast
- Save favorite cities
- Error handling

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI

## Setup

1. Clone the repository

```bash
git clone https://github.com/augustocardoso07/WeatherApp.git
cd WeatherApp
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add your WeatherAPI key:

```
WEATHER_API_KEY=your_api_key_here
```

You can get an API key by signing up at [WeatherAPI.com](https://www.weatherapi.com/)

4. Start the development server

```bash
npm start
```

## Running Tests

To run the tests:

```bash
npm test
```

## Project Structure

```
features/
  weather/
    components/     # React components for weather display
    hooks/         # Custom hooks for weather data
    services/      # API services for weather
    tests/         # Test files
    types/         # TypeScript types
  favorites/
    components/    # React components for favorites
    context/      # Favorites context and provider
app/
  (tabs)/         # Navigation and screens
```

## Technologies Used

- React Native
- TypeScript
- Expo Router (for navigation)
- Expo
- TanStack Query
- WeatherAPI
- AsyncStorage (for favorites persistence)
- Jest & Testing Library

## Features in Detail

### Weather Search

- Real-time weather data fetching
- Current temperature, conditions, and location display
- 5-hour weather forecast

### Favorites System

- Add cities to favorites with a single tap
- Remove cities from favorites list
- Persistent storage using AsyncStorage
- Quick navigation to weather details from favorites
- Empty state handling with helpful messages

## License

MIT
