// @ts-nocheck

import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import PokemonCard from "../components/PokemonCard";
import { colors } from "../constants/colors";
import { getPokemonList } from "../services/pokemonApi";

export default function HomeScreen() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPokemon() {
      try {
        const data = await getPokemonList(30);
        setPokemon(data);
      } catch (err) {
        setError("No se pudieron cargar los Pokémon.");
      } finally {
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>PokeExplorer</Text>
        <Text style={styles.subtitle}>
          Descubre y conoce a tus Pokémon favoritos
        </Text>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
          <Text style={styles.message}>
            Cargando Pokémon...
          </Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.message}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={pokemon}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PokemonCard pokemon={item} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    marginTop: 6,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 15,
  },
});