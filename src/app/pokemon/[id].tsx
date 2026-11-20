// @ts-nocheck

import { useEffect, useState } from "react";
import { useLocalSearchParams, Stack } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getPokemonById } from "../../services/pokemonApi";
import { colors, typeColors } from "../../constants/colors";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await getPokemonById(id);
        setPokemon(data);
      } catch (error) {
        console.log("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el Pokémon.</Text>
      </View>
    );
  }

  const mainType = pokemon.types[0].type.name;
  const pokemonColor = typeColors[mainType] || colors.primary;

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: pokemon.name.toUpperCase(),
          headerStyle: { backgroundColor: pokemonColor },
          headerTintColor: "#FFFFFF",
        }}
      />

      <View style={[styles.header, { backgroundColor: pokemonColor }]}>
        <Text style={styles.number}>
          #{String(pokemon.id).padStart(3, "0")}
        </Text>

        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{pokemon.name}</Text>

        <View style={styles.types}>
          {pokemon.types.map((item) => (
            <View
              key={item.type.name}
              style={[
                styles.badge,
                {
                  backgroundColor:
                    typeColors[item.type.name] || colors.primary,
                },
              ]}
            >
              <Text style={styles.badgeText}>
                {item.type.name}
              </Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Información</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Altura: {pokemon.height / 10} m
          </Text>

          <Text style={styles.infoText}>
            Peso: {pokemon.weight / 10} kg
          </Text>

          <Text style={styles.infoText}>
            Experiencia base: {pokemon.base_experience}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Estadísticas</Text>

        {pokemon.stats.map((item) => (
          <View key={item.stat.name} style={styles.statRow}>
            <Text style={styles.statName}>{item.stat.name}</Text>
            <Text style={styles.statValue}>{item.base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    padding: 25,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  number: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  image: {
    width: 240,
    height: 240,
  },
  content: {
    padding: 24,
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: colors.text,
    textAlign: "center",
  },
  types: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 18,
    gap: 10,
  },
  badge: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 20,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.card,
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
  },
  statName: {
    fontSize: 15,
    color: colors.text,
    textTransform: "capitalize",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary,
  },
});