const express = require("express");// Express (módulo de NPM)nos ayuda a escuchar las peticiones que se hacen desde el navegador al servido
const cors = require("cors");//cors(módulo de NPM): habilita para recibir peticiones de cualquier pagina del mundo.
const movies = require("./data/movies.json");
const users = require("./data/users.json");
const Database = require("better-sqlite3");



// importación de base de datos
const db = new Database('./src/db/database.db', { verbose: console.log })
// verbose: nuestro espía

// create and config server
const server = express(); //creamos servidor, inicia el proceso de escuchar
server.use(cors()); // configuramos el servidor para que sea una API pública, si quitamos cors será API privada
server.use(express.json({ limit: "10Mb" })); //configuramos el servidor le decimos q vamos a trabajar con Json
server.set('view engine', 'ejs');

// init express aplication
const serverPort = 4000;
// asociado a la línea 5
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


//Pintamos peliculas a través de la base contacto con fetch de apimovies
server.get("/movies", (req, res) => {
  //Preparamos la query.
  const query = db.prepare(' SELECT * FROM movies ');  // Select * = seleccionamos todas las columnas de la tabla.Movies es el nombre de nuestra tabla
  //Ejecutamos la query
  const list = query.all(); //devuelve varios registros gracias al ALL
  
  const genderFilterParam = req.query.gender;
  const filteredMovieGender = list
    .filter((movie) =>
      movie.gender.includes(genderFilterParam)
    )
  const response = {
    success: true, 
    movies: filteredMovieGender,
  };
  res.json(response);

});
// Forma antigua de ejecutar cuando teníamos Json:
// movies: list,
// movies: filteredMovieGender,// metemos todo lo que nos devuelve el filter
// movies: movies.movies// Este era nuestro json antes de utilizar el servidor de datos
// El primer movies es la constante que elegimos entre back y front, 
// el segundo, es la constante que hemos importado arriba
// el tercero, es para acceder al array de objetos

// endpoint login
server.post("/login", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const dataLogin = users.find((element) =>
    element.email.toLowerCase() === email.toLowerCase() && element.password === password);
  if (dataLogin) {
    res.json({
      success: true,
      userId: "id_de_la_usuaria_encontrada"
    });
  } else {
    res.json({
      succes: false,
      errorMessage: "Usuaria no encontrada",
    })
  }
});
//endpoint nueva usuaria
server.post("/sign-up", (req, res) => {
  // Body params (req.body)
  const email = req.body.email
  const password = req.body.password
  // Preparamos la  query
  const query = db.prepare(' INSERT INTO users (email, password) VALUES (?, ?)  ');
  // Ejecutamos la query.
  const result = query.run(email, password);
  
});

// :movieID = esto es igual a URL params que en web se ve como /(movieID)=nº de ID ejemplo: movies/1
server.get('/movies/:movieId', (req, res) => {
  //primer movies es el importado arriba el segundo movies es el del array de movies.json
  const foundMovie = movies.movies.find((movie) => movie.id === req.params.movieId);
  //con esta línea estamos pintando nuestra plantilla y no es necesario poner view, lo interpreta solo
  // Servidor de dinámicos
  res.render("movie", foundMovie);
  res.json(foundMovie);

}
);



// servidores estáticos (ficheros que nunca cambian )
const staticServer = "./src/public-react";
server.use(express.static(staticServer));

const staticServerImage = "./src/public-movies-images";
server.use(express.static(staticServerImage));

const staticServerCss = "./src/public-styles/css";
server.use(express.static(staticServerCss));


