import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { getPokemons } from '../../../actions/pokemons';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { PokeballBg } from '../../components/ui/PokeballBg';
import { FlatList } from 'react-native-gesture-handler';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  //! (*)
  const queryClient = useQueryClient();

  //! Forma tradicional de una petición HTTP.
  // const { isLoading, data: pokemons = [] } = useQuery({
  //* La "data" es lo que trae y es del tipo que retorna la función "queryFn"
  //   queryKey: ['pokemons'], //* Identificador para poder manejarlo el caché.
  //   queryFn: () => getPokemons(0), //* Función para obtener la información. Esta es la que hace la petición a la API.
  //   staleTime: 1000 * 60 * 60, //* Este es el tiempo que se mantendrá la información en caché (una hora).
  // });

  //! Forma para hacer peticiones en un infinite scroll.
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    //* data queda sin tipo porque ya no es de solo Pokemons
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0, //* Página inicial.
    staleTime: 1000 * 60 * 60,
    // queryFn: params => getPokemons(params.pageParam),
    //! (*) Este paso no es necesario, pero lo hago para evitar volver a hacer la petición cuando entro a un item por primera vez.
    queryFn: async params => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });
      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
  });

  // console.log(data); //! [[],[],[],[],[],...]

  return (
    <View style={[globalTheme.gloablMargin]}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokédex</Text>}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        onEndReachedThreshold={0.4}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
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
