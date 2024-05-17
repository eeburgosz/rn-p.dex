import React from 'react';
import { View, FlatList } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { Pokemon } from '../../../domain/entities/pokemon';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[globalTheme.gloablMargin, { paddingTop: top + 10 }]}>
      <TextInput
        placeholder="Buscar Pokémon"
        mode="flat"
        autoFocus
        autoCorrect={false}
        onChangeText={value => console.log(value)}
        value={''}
      />
      <ActivityIndicator style={{ paddingTop: 20 }} />

      <FlatList
        data={[] as Pokemon[]}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
