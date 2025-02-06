import axios from "axios";
import { WeatherData } from "../types/weather.types";

// Your WeatherAPI key from .env
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "http://api.weatherapi.com/v1";

export const weatherService = {
  async getWeather(city: string): Promise<WeatherData> {
    try {
      const response = await axios.get<WeatherData>(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=no`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.error?.message || "Failed to fetch weather data"
        );
      }
      throw new Error("An unexpected error occurred");
    }
  },
};
