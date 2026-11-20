import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, typeColors } from "../constants/colors";

export default function PokemonCard({ pokemon }) {
  const mainType = pokemon.types[0].type.name;
  const backgroundColor = typeColors[mainType] || colors.primary;

  const image =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <Link
      href={{
        pathname: "/pokemon/[id]",
        params: { id: String(pokemon.id) },
      }}
      style={styles.link}
    >
      <View style={styles.card}>
        <View style={styles.info}>
          <Text style={styles.number}>
            #{String(pokemon.id).padStart(3, "0")}
          </Text>

          <Text style={styles.name}>
            {pokemon.name}
          </Text>

          <View
            style={[
              styles.typeBadge,
              { backgroundColor },
            ]}
          >
            <Text style={styles.typeText}>
              {mainType}
            </Text>
          </View>
        </View>

        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    width: "100%",
    marginBottom: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
  },
  info: {
    flex: 1,
  },
  number: {
    fontSize: 13,
    color: colors.muted,
    marginBottom: 5,
  },
  name: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.text,
    textTransform: "capitalize",
    marginBottom: 10,
  },
  typeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  typeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  image: {
    width: 110,
    height: 110,
  },
});