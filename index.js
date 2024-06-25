require('dotenv').config();
const express = require('express');
const app = express();
const request = require('request');


const apiKey = process.env.API_KEY;

//Cada dato que reciba la API, lo convierte a JSON
app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({extended: true})); // Habilito recepción de formularios en servidor

//Configuración de vistas con PUG (motor de plantillas) No hace falta un require; el sistema ya sabe que esta instalado
///Directamente va a buscarlas en ./views
app.set('view engine', 'pug');
app.set('views','./views');

//Configuración carpeta pública para el CSS
app.use(express.static('public'));


//RUTAS
app.get('/', (req, res) => {
  res.render('home.pug')
})

/*app.get('/film', (req, res) => {
  res.render('film.pug')
})*/

/*app.post('/', (req, res) => {
  res.render('film.pug');
  console.log(req.body.film);
  
})*/

app.get('/film', (req, res) => {
  const title = req.query.title;
  console.log(title)

  if (!title) {
      return res.redirect('/');
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${title}`;

  request(url, (error, response, body) => {
      if (error) {
          console.error(error);
          return res.render('film', { movie: null, error: 'Error retrieving data from OMDB API' });
      }

      const movie = JSON.parse(body);
      console.log(movie);

      if (movie.Response === 'False') {
          res.render('film', { movie: null, error: 'No se encontró la película.' });
      } else {
          res.render('film', { movie, error: null });
      }
  });
});


app.listen(3000, function () {
  console.log('Listening on port 3000!')
})
