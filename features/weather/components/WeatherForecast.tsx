import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { WeatherData } from "../types/weather.types";

interface WeatherForecastProps {
  weather: WeatherData;
}

export const WeatherForecast = ({ weather }: WeatherForecastProps) => {
  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.weatherContainer}>
      <Text style={styles.forecastTitle}>Next 5 Hours</Text>
      <ScrollView horizontal style={styles.forecastContainer}>
        {weather.forecast.forecastday[0].hour
          .filter((hour) => new Date(hour.time) > new Date())
          .slice(0, 5)
          .map((hour) => (
            <View key={hour.time} style={styles.hourlyForecast}>
              <Text style={styles.hourlyTime}>{formatTime(hour.time)}</Text>
              <Image
                source={{ uri: `https:${hour.condition.icon}` }}
                style={styles.hourlyIcon}
              />
              <Text style={styles.hourlyTemp}>{hour.temp_c}°C</Text>
            </View>
          ))}
      </ScrollView>
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
