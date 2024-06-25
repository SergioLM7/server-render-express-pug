const express = require('express')
const app = express()

const apiKey = process.env.API_KEY;

//Cada dato que reciba la API, lo convierte a JSON
app.use(express.json()); // Habilito recepción de JSON en servidor
app.use(express.urlencoded({extended: true})); // Habilito recepción de formularios en servidor

//Configuración de vistas con PUG (motor de plantillas) No hace falta un require; el sistema ya sabe que esta instalado
///Directamente va a buscarlas en ./views
app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', function (req, res) {
  res.render('home.pug')
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})