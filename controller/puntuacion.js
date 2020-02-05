var Puntuacion = require('../models/puntuacion');

async function getAll(req, res) {
    //Callbacks
    /*Puntuacion.find({}).exec( (err, puntuaciones) =>{
        if(err) {
            res.status(500).send({accion: 'get all', mensaje: 'erro al obtener las puntuaciones'})
        }else {
            res.status(200).send({accion: 'get all', datos: puntuaciones})
        }
    })*/

    //Promesas
    /*Puntuacion.find({}).exec()
        .then( puntuaciones => res.status(200).send({accion: 'get all', datos: puntuaciones}))
        .catch( err => res.status(500).send({accion: 'get all', mensaje: `erro al obtener las puntuaciones ${err}`}))
    */

    //async / await
    try {
        let puntuaciones = await Puntuacion.find();
        res.status(200).send({accion: 'get all', datos: puntuaciones});
    }catch(err) {
        res.status(500).send({accion: 'get all', mensaje: `erro al obtener las puntuaciones ${err}`});
    }
}

async function getById(req, res) {
    //callbacks
    /*Puntuacion.findById(puntuacionId, (err, puntuacion) =>{
        if(err) {
            res.status(500).send({accion: 'get one', mensaje: 'erro al obtener las puntuaciones'})
        }else {
            res.status(200).send({accion: 'get one', datos: puntuacion})
        }
    })*/

    try {
        let puntuacionId = req.params.id;
        let puntuacion = await Puntuacion.findById(puntuacionId);
        res.status(200).send({accion: 'get one', datos: puntuacion})
    }catch(err) {
        res.status(500).send({accion: 'get one', mensaje: `error al obtener las puntuaciones ${err}`})
    }
}

async function insert(req, res) {
    const puntuacion = new Puntuacion(req.body);
    try {
        let puntuacionGuardada = await puntuacion.save();
        res.status(200).send({accion:'save', datos: puntuacionGuardada});
    }catch(err) {
        res.status(500).send({accion:'save', mensaje: `Error al guardar la puntuacion ${err}`});
    }
}

async function remove(req, res) {
    try {
        let puntuacionId = req.params.id;
        let puntuacionBorrada = await Puntuacion.findByIdAndDelete(puntuacionId);
        if(!puntuacionBorrada){
            res.status(404).send({accion: 'delete', mensaje: 'Error no existe el id a borrar.'});
        }
        res.status(200).send({accion: 'delete', datos: puntuacionBorrada});
    }catch(err) {
        res.status(500).send({accion: 'delete', mensaje: `Error al borrar la puntuacion ${err}`});
    }
}

async function update(req,res) {
    try {
        var datos = req.body;
        let puntuacionId = req.params.id;
        let puntuacionActualizada = await Puntuacion.findByIdAndUpdate(puntuacionId, datos);
        if(!puntuacionActualizada){
            res.status(404).send({accion: 'delete', mensaje: 'Error no existe el id a actualizar.'});
        }
        res.status(200).send({accion: 'update', datos: puntuacionActualizada});
    }catch(err) {
        res.status(500).send({accion: 'update', mensaje: `Error al actualizar la puntuacion ${err}`});
    }
}

module.exports = {getAll, getById, insert, update, remove}