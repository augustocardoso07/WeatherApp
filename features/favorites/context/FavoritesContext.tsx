import React, { createContext, useContext, useState, useCallback } from "react";
import { MMKV } from "react-native-mmkv";

type FavoriteCity = {
  name: string;
  country: string;
};

type FavoritesContextType = {
  favorites: FavoriteCity[];
  addFavorite: (city: FavoriteCity) => Promise<void>;
  removeFavorite: (cityName: string) => Promise<void>;
  isFavorite: (cityName: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const storage = new MMKV();

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  React.useEffect(() => {
    // Load favorites from MMKV on mount
    const loadFavorites = async () => {
      try {
        const storedFavorites = storage.getString("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  const addFavorite = useCallback(
    async (city: FavoriteCity) => {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      try {
        storage.set("favorites", JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error saving favorite:", error);
      }
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    async (cityName: string) => {
      const newFavorites = favorites.filter((city) => city.name !== cityName);
      setFavorites(newFavorites);
      try {
        storage.set("favorites", JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error removing favorite:", error);
      }
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (cityName: string) => {
      return favorites.some((city) => city.name === cityName);
    },
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
