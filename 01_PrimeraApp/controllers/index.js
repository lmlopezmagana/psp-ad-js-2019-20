
const servicio = require('../services/index');

module.exports.getController = (req, res) => {
    let resultado = servicio.getTodos();
    //res.status(200).json({mensaje: "Hola Mundo!"})
    res.status(200).json(resultado);
};

module.exports.getUno = (req, res) => {
    const result = servicio.getUno(req.params.id);
    if (result.length == 0)
        res.sendStatus(404);
    else
        res.status(200).json(result[0]);
}

module.exports.postController = (req, res, next) => {

    res.status(201).json(servicio.insert({
        userId: req.body.userId,
        id: req.body.id,
        title: req.body.title,
        body: req.body.body
    }));
}

module.exports.putController = (req, res, next) => {
    
    let result = servicio.update(req.params.id, {
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body
    })

    if (result === undefined) {
        res.sendStatus(404);
    } else {
        res.status(200).json(result);
    }
}


module.exports.deleteController = (req, res) => {
    
    let status = servicio.delete(req.params.id) ? 204 : 404;
    res.sendStatus(status);
}

