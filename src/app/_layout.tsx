import { Stack } from "expo-router";
import { colors } from "../constants/colors";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "PokeExplorer",
        }}
      />

      <Stack.Screen
        name="pokemon/[id]"
        options={{
          title: "Detalles del Pokémon",
        }}
      />
    </Stack>
  );
}