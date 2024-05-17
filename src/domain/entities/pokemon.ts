//! Paso 1 - Entities. Nuestra estructura de datos.

//! El propósito de las entities, es determinar un patrón que voy a utilizar en mi aplicación. Es decir, voy a tomar toda la
//! información de la API y voy a extraer solamente lo que necesito a mi manera. Esto es útil por si en un futuro la API cambia,
//! no tengo qué cambiar todos mis componentes donde utilizo la información, solo cambio la forma en que el mapper (siguiente paso)
//! factoriza la información.

export interface Pokemon {
  id: number;
  name: string;
  types: string[]; //* En la API, los types vienen como un arreglo de objetos anindados. Para este caso usaré los mappers.
  avatar: string;
  sprites: string[]; //* En la API vienen como un objeto con un montón de properties, pero yo lo voy a formatear de otra forma.
  //
  color: string;
}
