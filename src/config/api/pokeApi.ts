//! Aquí preparo la instancia de Axios. Esto se hace para no estar haciendo peticiones en todos lados acumukando código.

import axios from 'axios';

export const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});
