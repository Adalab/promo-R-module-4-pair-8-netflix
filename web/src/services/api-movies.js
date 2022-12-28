// login

const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  return fetch(`http://localhost:4000/movies?gender=${params.gender}`, {
    method: 'GET', // por defecto es get(recibo), no es necesario ponerlo
    // Con http://localhost:4000/movies ("/movies" es nuestra ruta)
    // Con http://localhost:4000/movies?gender=${params.gender} ("gender(clave)=${params.gender} (valor)" es nuestra Query Params)
  })
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;


