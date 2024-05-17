import { pokeApi } from '../../config/api/pokeApi';
import type { Pokemon } from '../../domain/entities/pokemon';
import type {
  PokeAPIPaginatedResponse,
  PokeAPIPokemon,
} from '../../infrastructure/interfaces/pokeapi.interfaces'; //! Despues del import pongo "type" (solo cuando son interfaces o types) para ahorrar la generación de código en el build de la aplicación.
// import { pokeApiPokemonToEntity } from '../../infrastructure/mappers/pokemon.mapper'; //! Si lo hago con la función del mapper.
import { PokemonMapper } from '../../infrastructure/mappers/pokemon.mapper'; //! Si lo hago con la clase del mapper.

//! Esta función es solamente para que me dé tiempo de ver el <ActivityIndicator> que está en el home
// export const sleep = async () => {
//   return new Promise(resolve => setTimeout(resolve, 2000));
// };
//! -------------------------------------------------------------------------------------------------

export const getPokemons = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  // await sleep();
  try {
    const url = `/pokemon?offset=${page * 10}&limit=${limit}`; //! Por como trabaja la API, pongo page*10. Si recibo 0, tengo 0. Si recibo 1, tengo 10
    const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url); //! Esta respuesta esperada es la interface creada a partir de la respuesta que da Postman a esa URL.

    //! En el siguiente paso, si bien es una petición asíncrona, no la hago con async-await porque son 20 peticiones y las haría una por una. Prefiero obtener una promesa y luego hacer las 20 peticiones en simultáneo.
    const pokemonPromises = data.results.map(info => {
      return pokeApi.get<PokeAPIPokemon>(info.url);
    });

    //! La siguiente respuesta me trae todos los pokemones de la forma en que me los manda la API. En este punto debo crear un mapper para formatear toda la info que llega de forma que cumpla con mi entity.
    const pokeApiPokemons = await Promise.all(pokemonPromises);
    //! Aplicando el mapper. El mapper va dentro del map porque se debe aplicar a cada uno de los items que trae "pokeApiPokemons"
    //! ---------- Usando la clase del mapper.
    const pokemons = pokeApiPokemons.map(resp =>
      PokemonMapper.pokeApiPokemonToEntity(resp.data),
    );

    //! ---------- Usando la función del mapper.
    // const pokemons = pokeApiPokemons.map(resp =>
    //   pokeApiPokemonToEntity(resp.data),
    // );
    // console.log(pokemons[0]);
    return pokemons;
  } catch (error) {
    throw new Error('Error getting pokemons');
  }
};
