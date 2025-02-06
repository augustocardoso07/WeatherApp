import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { FavoriteCitiesScreen } from "./FavoriteCitiesScreen";
import { useFavorites } from "../context/FavoritesContext";

jest.mock("../context/FavoritesContext", () => ({
  useFavorites: jest.fn(() => ({
    favorites: [],
    removeFavorite: jest.fn(),
  })),
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "MockIonicons",
}));

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
  isLoaded: jest.fn(() => true),
}));

describe("FavoriteCitiesScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText } = render(<FavoriteCitiesScreen />);
    expect(getByText("No favorite cities yet")).toBeTruthy();
  });

  it("displays favorite cities", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [
        { name: "New York", country: "USA" },
        { name: "London", country: "UK" },
      ],
      removeFavorite: jest.fn(),
    });
    const { getByText } = render(<FavoriteCitiesScreen />);
    expect(getByText("New York")).toBeTruthy();
    expect(getByText("London")).toBeTruthy();
  });

  it("removes a city from favorites", () => {
    const removeFavoriteMock = jest.fn();
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [{ name: "New York", country: "USA" }],
      removeFavorite: removeFavoriteMock,
    });
    const { getByTestId } = render(<FavoriteCitiesScreen />);
    fireEvent.press(getByTestId("remove-favorite"));
    expect(removeFavoriteMock).toHaveBeenCalledWith("New York");
  });
});
