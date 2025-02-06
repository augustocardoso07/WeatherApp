import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDebouncedWeather } from "../hooks/useWeather";
import { WeatherCard } from "./WeatherCard";
import { WeatherForecast } from "./WeatherForecast";

export const WeatherScreen = () => {
  const [city, setCity] = useState("");
  const { data: weather, isLoading, error } = useDebouncedWeather(city);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        onSubmitEditing={() => setCity(city.trim())}
      />

      {isLoading && <ActivityIndicator size="large" style={styles.loader} />}

      {error && <Text style={styles.error}>{error.message}</Text>}

      {weather && (
        <>
          <WeatherCard weather={weather} />
          <WeatherForecast weather={weather} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "white",
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  weatherContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  currentWeather: {
    alignItems: "center",
    marginBottom: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 10,
  },
  condition: {
    fontSize: 18,
    color: "#666",
  },
  forecastTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  forecastContainer: {
    flexDirection: "row",
  },
  hourlyForecast: {
    alignItems: "center",
    marginRight: 20,
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 10,
    minWidth: 80,
  },
  hourlyTime: {
    fontSize: 14,
    marginBottom: 5,
  },
  hourlyIcon: {
    width: 50,
    height: 50,
  },
  hourlyTemp: {
    fontSize: 16,
    fontWeight: "500",
  },
});
