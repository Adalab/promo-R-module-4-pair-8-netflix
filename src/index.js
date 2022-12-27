const express = require("express");
const cors = require("cors");
const movies = require("./data/movies.json");
const users = require("./data/users.json");
const Database = require("better-sqlite3");
// importación de base de datos
// AQUÍ BASES DE DATOS I PUNTO TRES 

const db = new Database('./src/db/database.db', { verbose: console.log })
const dbUser = new Database('./src/db/users.db', { verbose: console.log })
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





server.get("/movies", (req, res) => {
  //Preparamos la query.
  const query = db.prepare(' SELECT * FROM movies ');  // Select * = seleccionamos todas las columnas de la tabla.Movies es el nombre de nuestra tabla
  //Ejecutamos la query
  const list = query.all(); //devuelve varios registros gracias al ALL
  // console.log(list);
  console.log(req.query);
  const genderFilterParam = req.query.gender;
  const sortFilterParam = req.query.sort;
  const filteredMovieGender = list
    .filter((movie) =>
      movie.gender.includes(genderFilterParam)
    )
  // .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
  // sortFilterParam.sort(function (a, b) {
  //   if (a.name > b.name) {
  //     return 1;
  //   }
  //   if (a.name < b.name) {
  //     return -1;
  //   }
  //   // a must be equal to b
  //   return 0;
  // });

  const response = {
    success: true,
    // movies: list,
    movies: filteredMovieGender,
    // movies: filteredMovieGender,// metemos todo lo que nos devuelve el filter
    // movies: movies.movies// Este era nuestro json antes de utilizar el servidor de datos
  };
  res.json(response);

});
// Forma antigua de ejecutar línea 36
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
  const email = req.body.email
  const password = req.body.password
  const query = dbUser.prepare(' INSERT INTO users (email, password) VALUES (?, ?)  ');
  const result = query.run(email, password);
  console.log(result)
  // res.json(result);
  // res.json({
  //   "success": true,
  //   "userId": "nuevo-id-añadido"
  // })

  // const dataLogin = users.find((element) =>
  //   element.email.toLowerCase() === email.toLowerCase() && element.password === password);
  // if (dataLogin) {
  //   res.json({
  //     success: true,
  //     userId: "id_de_la_usuaria_encontrada"
  //   });
  // } else {
  //   res.json({
  //     succes: false,
  //     errorMessage: "Usuaria no encontrada",
  //   })
  // }
});

// :movieID = esto es igual a URL params que en web se ve como /(movieID)=nº de ID ejemplo: movies/1
server.get('/movies/:movieId', (req, res) => {
  //primer movies es el importado arriba el segundo movies es el del array de movies.json
  const foundMovie = movies.movies.find((movie) => movie.id === req.params.movieId);
  //con esta línea estamos pintando nuestra plantilla y no es necesario poner view, lo interpreta solo
  res.render("movie", foundMovie);
  // console.log('Url params:', req.params)
  res.json(foundMovie);

}

);

/* Esto es un ejemplo
app.get("/es/film:filmId.html", (req, res) => {
  // get film data
  const filmData = films.find((film) => film.id === req.params.filmId);
  console.log("film data", filmData);

  // response with rendered template
  if (filmData) {
    res.render("pages/film", filmData);
  } else {
    res.render("pages/film-not-found");
  }
});
*/

// ruta estática
const staticServer = "./src/public-react";
server.use(express.static(staticServer));

const staticServerImage = "./src/public-movies-images";
server.use(express.static(staticServerImage));


const staticServerCss = "./src/public-styles/css";
server.use(express.static(staticServerCss));


