# PokeExplorer

## CW05: Application Using API Data

PokeExplorer is a mobile application developed with React Native and Expo. It uses the PokéAPI to display Pokémon information dynamically.

## Features

- Fetch Pokémon data from a public API.
- Retrieve additional details for each Pokémon.
- Display Pokémon images, names, and types.
- Apply dynamic colors based on Pokémon types.
- Navigate between screens using Expo Router Link.
- Pass Pokémon IDs using useLocalSearchParams.
- Customize navigation headers.
- Display Pokémon statistics, height, and weight.

## Technologies

- React Native
- Expo
- Expo Router
- JavaScript
- TypeScript
- PokéAPI

## API

https://pokeapi.co/api/v2/

## Installation

1. Install dependencies:

   npm install

2. Start the application:

   npx expo start

3. Press "w" to open the application in a web browser.

## Project Structure

src/
  app/
    _layout.tsx
    index.tsx
    pokemon/
      [id].tsx
  components/
    PokemonCard.jsx
  constants/
    colors.js
  services/
    pokemonApi.js

## Author

CW05 - Mobile Application Development
