import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { Pokemon } from '../../../domain/entities/pokemon';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const { isLoading, data: pokemons = [] } = useQuery({
    //! La "data" es lo que trae y es del tipo que retorna la función "queryFn"
    queryKey: ['pokemons'], //! Identificador para poder manejarlo el caché.
    queryFn: () => getPokemons(0), //! Función para obtener la información. Esta es la que hace la petición a la API.
    staleTime: 1000 * 60 * 60, //! Este es el tiempo que se mantendrá la información en caché (una hora).
  });

  return (
    <View style={[globalTheme.gloablMargin]}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
