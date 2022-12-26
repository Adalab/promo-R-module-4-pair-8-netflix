// login

const getMoviesFromApi = (params) => {
  console.log('Se están pidiendo las películas de la app');
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  return fetch(`http://localhost:4000/movies?gender=${params.gender}&sort=${params.sort}`, {
    method: 'GET', // por defecto es get, no es necesario ponerlo
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


//'http://localhost:4000/movies -> Query.Params? --> URL.Params clave(gender)= valor(${params.gender}) gender=${params.gender} &sort=${params.sort}