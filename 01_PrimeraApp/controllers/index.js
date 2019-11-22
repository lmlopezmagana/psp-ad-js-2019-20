
const servicio = require('../services/index');


module.exports.reqlogger = (req, res, next) => {
    console.log(req);
    next();
}

module.exports.reslogger = (req, res, next) => {
    console.log(res);
    next();
}

module.exports.getController = (req, res) => {
    let resultado = servicio.getTodos();
    //res.status(200).json({mensaje: "Hola Mundo!"})
    res.status(200).json(resultado);
};

module.exports.postController = (req, res, next) => {
    res.status(201).json({mensaje: req.body.mensaje})
}

module.exports.putController = (req, res, next) => {
    res.status(200).json({
      mensaje: req.body.mensaje,
      modificado: true
    })
}

module.exports.loggerDelete = (req, res, next) => {
    console.log('Borrando un elemento')
    next()
}

module.exports.deleteController = (req, res) => {
    res.sendStatus(204)
}

module.exports.getUno = (req, res) => {
    res.status(200).json(servicio.getUno(req.params.id));
}