var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Preparación de bodyparser para transformar las peticiones de texto a JSON
app.use(bodyParser.urlencoded({estended:false}));
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.status(200).send('Hola');
});

app.get('/puntuaciones', (req, res)=> {
    // TODO leer base de datos
    let datosJSON = {
        accion:'get all',
        datos: [
            {nombre:'Pepe',puntuacion: 33},
            {nombre:'Bea',puntuacion: 23},
            {nombre:'Felix',puntuacion: 29}
        ]
    };
    
    res.status(200).send(datosJSON);
});

app.post('/puntuacion', (req, res)=> {
    var datos = req.body;
    // TODO insertar en la base de datos
    let datosJsonRespuesta = {
        accion: 'save',
        datos: datos
    }
    res.status(200).send(datosJsonRespuesta);
});

app.delete('/puntuacion/:id', (req, res)=> {
    let puntuacionId = req.params.is;
    let datosJsonRespuesta = {
        accion: 'delete',
        datos: puntuacionId
    }
    res.status(200).send(datosJsonRespuesta)
});

app.listen(5200, ()=> {
    console.log('API REST funcionando en http://localhost:5200');
});