import { useQuery } from "@tanstack/react-query";
import { weatherService } from "../services/weather.service";
import { WeatherData } from "../types/weather.types";
import { useState, useEffect } from "react";

export const useWeather = (city: string) => {
  return useQuery<WeatherData, Error>({
    queryKey: ["weather", city],
    queryFn: () => weatherService.getWeather(city),
    enabled: Boolean(city),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export const useDebouncedWeather = (city: string, delay: number = 500) => {
  const [debouncedCity, setDebouncedCity] = useState(city);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [city, delay]);

  return useWeather(debouncedCity);
};
