var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routerPuntuacion = require('./routers/puntuacion')
var morgan = require('morgan');
var cors = require('cors');
var app = express();


// Preparación de bodyparser para transformar las peticiones de texto a JSON
app.use(bodyParser.urlencoded({estended:false}));
app.use(bodyParser.json());

app.use(cors());
app.use(morgan('dev'));

app.use('/puntuacion', routerPuntuacion)

// las movidas de los cors, ahora se hace con un modulo npm install cors
/*app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Allow', 'GET,POST,PUT,DELETE');
    next();
})*/


app.get('/', (req, res)=> {
    res.status(200).send('Hola');
});

/*mongoose.connect('mongodb://localhost:27018/scores', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true}, (err, res)=> {
    if(err) {
        console.log('Error al conectar a la base de datos.')
        throw err;
    }else {
        console.log('Conexión correcta a mondoDB');

        
    }
})*/

const run = async()=> {
    await mongoose.connect('mongodb://localhost:27018/scores', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true});
    await app.listen(5200)

    console.log('Servidor y BD arrancados.')
}
run().catch(err => console.err(`Fallo al arrancar el servidor ${err}`));