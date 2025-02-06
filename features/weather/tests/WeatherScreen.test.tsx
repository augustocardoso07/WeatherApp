import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherScreen } from "../components/WeatherScreen";
import { weatherService } from "../services/weather.service";

jest.mock("../services/weather.service");

const mockWeatherData = {
  location: {
    name: "London",
    country: "UK",
  },
  current: {
    temp_c: 20,
    condition: {
      text: "Sunny",
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    },
  },
  forecast: {
    forecastday: [
      {
        hour: Array(24).fill({
          time: "2024-02-06 13:00",
          temp_c: 22,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          },
        }),
      },
    ],
  },
};

describe("WeatherScreen", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    jest.clearAllMocks();
  });

  it("renders input field correctly", () => {
    const { getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <WeatherScreen />
      </QueryClientProvider>
    );

    expect(getByPlaceholderText("Enter city name")).toBeTruthy();
  });

  it("fetches and displays weather data when city is entered", async () => {
    (weatherService.getWeather as jest.Mock).mockResolvedValueOnce(
      mockWeatherData
    );

    const { getByPlaceholderText, getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <WeatherScreen />
      </QueryClientProvider>
    );

    const input = getByPlaceholderText("Enter city name");
    fireEvent.changeText(input, "London");
    fireEvent(input, "submitEditing");

    await waitFor(() => {
      expect(getByText("London, UK")).toBeTruthy();
      expect(getByText("20°C")).toBeTruthy();
      expect(getByText("Sunny")).toBeTruthy();
      expect(queryByText("Next 5 Hours")).toBeTruthy();
    });
  });

  it("displays error message when API call fails", async () => {
    const errorMessage = "City not found";
    (weatherService.getWeather as jest.Mock).mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const { getByPlaceholderText, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <WeatherScreen />
      </QueryClientProvider>
    );

    const input = getByPlaceholderText("Enter city name");
    fireEvent.changeText(input, "InvalidCity");
    fireEvent(input, "submitEditing");

    await waitFor(() => {
      expect(getByText(errorMessage)).toBeTruthy();
    });
  });
});
