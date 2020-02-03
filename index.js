var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Puntuacion = require('./models/puntuacion');

var app = express();

// Preparación de bodyparser para transformar las peticiones de texto a JSON
app.use(bodyParser.urlencoded({estended:false}));
app.use(bodyParser.json());

app.get('/', (req, res)=> {
    res.status(200).send('Hola');
});

app.get('/puntuaciones', (req, res)=> {

    Puntuacion.find({}).exec( (err, puntuaciones) =>{
        if(err) {
            res.status(500).send({accion: 'get all', mensaje: 'erro al obtener las puntuaciones'})
        }else {
            res.status(200).send({accion: 'get all', datos: puntuaciones})
        }
    })

    /*let datosJSON = {
        accion:'get all',
        datos: [
            {nombre:'Pepe',puntuacion: 33},
            {nombre:'Bea',puntuacion: 23},
            {nombre:'Felix',puntuacion: 29}
        ]
    };
    res.status(200).send(datosJSON);*/
});

app.post('/puntuacion', (req, res)=> {
    var datos = req.body;

    var puntuacion = new Puntuacion();
    puntuacion.nombre = datos.nombre;
    puntuacion.puntuacion = datos.puntuacion;
    puntuacion.save( (err, puntuacionGuardada) => {
        if(err) {
            res.status(500).send({accion:'save', mensaje: 'Error al guardar la puntuacion'});
        }else {
            res.status(200).send({accion:'save', datos: puntuacionGuardada});
        }
    });


    /*var datos = req.body;
    // TODO insertar en la base de datos
    let datosJsonRespuesta = {
        accion: 'save',
        datos: datos
    }
    res.status(200).send(datosJsonRespuesta);*/
});

app.delete('/puntuacion/:id', (req, res)=> {
    let puntuacionId = req.params.id;
    Puntuacion.findByIdAndDelete(puntuacionId, (err,puntuacionBorrada) => {
        if(err) {
            res.status(500).send({accion: 'delete', mensaje: 'Error al borrar la puntuacion'});
        }if(!puntuacionBorrada) {
            res.send(404).send({accion: 'delete', mensaje: 'Error el ID a borrar no existe'})
        }else {
            res.status(200).send({accion: 'delete', datos: puntuacionBorrada});
        }
    });

    /*let puntuacionId = req.params.is;
    let datosJsonRespuesta = {
        accion: 'delete',
        datos: puntuacionId
    }
    res.status(200).send(datosJsonRespuesta)*/
});

mongoose.connect('mongodb://localhost:27017/scores', (err, res)=> {
    if(err) {
        console.log('Error al conectar a la base de datos.')
        throw err;
    }else {
        console.log('Conexión correcta a mondoDB');

        app.listen(5200, ()=> {
            console.log('API REST funcionando en http://localhost:5200');
        });
    }
})