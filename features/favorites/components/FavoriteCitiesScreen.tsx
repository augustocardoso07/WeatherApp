import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export const FavoriteCitiesScreen = () => {
  const { favorites, removeFavorite } = useFavorites();
  const router = useRouter();

  const handleCityPress = (cityName: string) => {
    router.push(`/?city=${encodeURIComponent(cityName)}`);
  };

  const renderItem = ({
    item,
  }: {
    item: { name: string; country: string };
  }) => (
    <TouchableOpacity
      style={styles.cityCard}
      onPress={() => handleCityPress(item.name)}
    >
      <View style={styles.cityInfo}>
        <Text style={styles.cityName}>{item.name}</Text>
        <Text style={styles.countryName}>{item.country}</Text>
      </View>
      <TouchableOpacity
        onPress={() => removeFavorite(item.name)}
        style={styles.removeButton}
        testID="remove-favorite"
      >
        <Ionicons name="close-circle-outline" size={24} color="#666" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={64} color="#666" />
        <Text style={styles.emptyText}>No favorite cities yet</Text>
        <Text style={styles.emptySubtext}>
          Add cities to your favorites to see them here
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 16,
  },
  cityCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  countryName: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
});
