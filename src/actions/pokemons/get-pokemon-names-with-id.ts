import { pokeApi } from '../../config/api/pokeApi';
import { PokeAPIPaginatedResponse } from '../../infrastructure/interfaces/pokeapi.interfaces';

export const getPokemonNamesWithId = async () => {
  //! Como la API no tiene un endpoint para buscar por nombre, hago una petición de 1000 para obtener y almacenar en caché toda la info que pueda.
  const url = 'pokemon?limit=1000';
  const { data } = await pokeApi.get<PokeAPIPaginatedResponse>(url);

  return data.results.map(info => ({
    id: Number(info.url.split('/')[6]), //! Tomo la URL, la divido donde hayan "/" y la 6ta posición es el id del pokémon
    name: info.name,
  }));
};
