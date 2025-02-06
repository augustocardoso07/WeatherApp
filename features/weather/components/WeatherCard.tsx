import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { WeatherData } from "../types/weather.types";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../../favorites/context/FavoritesContext";

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const cityName = weather.location.name;
  const isCityFavorite = isFavorite(cityName);

  const toggleFavorite = async () => {
    if (isCityFavorite) {
      await removeFavorite(cityName);
    } else {
      await addFavorite({
        name: cityName,
        country: weather.location.country,
      });
    }
  };

  return (
    <View style={styles.weatherContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.location}>
          {cityName}, {weather.location.country}
        </Text>
        <TouchableOpacity
          onPress={toggleFavorite}
          style={styles.favoriteButton}
          testID="toggle-favorite"
        >
          <Ionicons
            name={isCityFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isCityFavorite ? "#ff4444" : "#666"}
          />
        </TouchableOpacity>
      </View>

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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
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
