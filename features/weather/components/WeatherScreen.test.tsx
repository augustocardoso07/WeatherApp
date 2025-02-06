import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { WeatherScreen } from "./WeatherScreen";
import { FavoritesProvider } from "../../favorites/context/FavoritesContext";

jest.mock("../hooks/useWeather", () => {
  const originalModule = jest.requireActual("../hooks/useWeather");
  return {
    ...originalModule,
    useDebouncedWeather: jest.fn((city) => {
      if (city === "Loading City") {
        return { data: null, isLoading: true, error: null };
      }
      if (city === "Error City") {
        return {
          data: null,
          isLoading: false,
          error: { message: "Error fetching data" },
        };
      }
      if (city === "Data City") {
        return {
          data: {
            location: { name: "Test City" },
            current: {
              condition: {
                text: "Sunny",
                icon: "/test-icon.png",
              },
              temp_c: 25,
            },
            forecast: {
              forecastday: [
                {
                  hour: [
                    {
                      time: "2023-10-01 01:00",
                      temp_c: 20,
                      condition: { text: "Clear", icon: "/test-icon.png" },
                    },
                    {
                      time: "2023-10-01 02:00",
                      temp_c: 21,
                      condition: { text: "Clear", icon: "/test-icon.png" },
                    },
                    {
                      time: "2023-10-01 03:00",
                      temp_c: 22,
                      condition: { text: "Clear", icon: "/test-icon.png" },
                    },
                    {
                      time: "2023-10-01 04:00",
                      temp_c: 23,
                      condition: { text: "Clear", icon: "/test-icon.png" },
                    },
                    {
                      time: "2023-10-01 05:00",
                      temp_c: 24,
                      condition: { text: "Clear", icon: "/test-icon.png" },
                    },
                  ],
                },
              ],
            },
            temperature: 25,
            condition: "Sunny",
          },
          isLoading: false,
          error: null,
        };
      }
      return { data: null, isLoading: false, error: null };
    }),
  };
});

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ city: "Test City" })),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "MockIonicons",
}));

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

describe("WeatherScreen", () => {
  const renderWithProvider = (ui: React.ReactElement) => {
    return render(<FavoritesProvider>{ui}</FavoritesProvider>);
  };

  it("renders correctly", () => {
    const { getByPlaceholderText } = renderWithProvider(<WeatherScreen />);
    expect(getByPlaceholderText("Enter city name")).toBeTruthy();
  });

  it("shows loading indicator when loading", () => {
    const { getByPlaceholderText, getByTestId } = renderWithProvider(
      <WeatherScreen />
    );
    fireEvent.changeText(
      getByPlaceholderText("Enter city name"),
      "Loading City"
    );
    expect(getByTestId("loading-indicator")).toBeTruthy();
  });

  it("displays error message on error", () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <WeatherScreen />
    );
    fireEvent.changeText(getByPlaceholderText("Enter city name"), "Error City");
    expect(getByText("Error fetching data")).toBeTruthy();
  });

  it("displays weather data when available", () => {
    const { getByPlaceholderText, getByText } = renderWithProvider(
      <WeatherScreen />
    );
    fireEvent.changeText(getByPlaceholderText("Enter city name"), "Data City");
    expect(getByText("25°C")).toBeTruthy();
    expect(getByText("Sunny")).toBeTruthy();
  });
});
