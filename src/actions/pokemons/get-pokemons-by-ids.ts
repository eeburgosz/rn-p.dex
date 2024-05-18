import { Pokemon } from '../../domain/entities/pokemon';
import { getPokemonById } from './get-pokemon-by-id';

export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
  try {
    //! Voy a hacerlo con un Promise porque si el resultado son, por ejemplo, 6 pokemons, esperaré a que se cumplan las 6 en simultáneo.
    const pokemonPromises: Promise<Pokemon>[] = ids.map(id => {
      return getPokemonById(id);
    });
    return Promise.all(pokemonPromises);
  } catch (error) {
    throw new Error(`Error getting pokemon by ids: ${ids}`);
  }
};
