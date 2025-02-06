import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { WeatherData } from "../types/weather.types";

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.location}>
        {weather.location.name}, {weather.location.country}
      </Text>

      <View style={styles.currentWeather}>
        <Image
          source={{ uri: `https:${weather.current.condition.icon}` }}
          style={styles.weatherIcon}
        />
        <Text style={styles.temperature}>{weather.current.temp_c}°C</Text>
        <Text style={styles.condition}>{weather.current.condition.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  currentWeather: {
    alignItems: "center",
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
});
