const API_URL = "https://pokeapi.co/api/v2";

// Obtener la lista de Pokémon
export async function getPokemonList(limit = 30) {
  const response = await fetch(
    `${API_URL}/pokemon?limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los Pokémon");
  }

  const data = await response.json();

  const pokemon = await Promise.all(
    data.results.map(async (item) => {
      const detailResponse = await fetch(item.url);

      if (!detailResponse.ok) {
        throw new Error("Error al obtener detalles");
      }

      return await detailResponse.json();
    })
  );

  return pokemon;
}

export async function getPokemonById(id) {
  const response = await fetch(
    `${API_URL}/pokemon/${id}`
  );

  if (!response.ok) {
    throw new Error("Pokémon no encontrado");
  }

  return await response.json();
}