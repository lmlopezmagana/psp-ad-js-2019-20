var express = require('express');
var router = express.Router();

const controller = require('../controllers/index');

/* router.get('/', (req, res, next) => {
  res.status(200).json({mensaje: "Hola Mundo!"})
});
 */

router.get('/', controller.reqlogger, 
                controller.getController 
                );
router.post('/', controller.postController);
router.put('/', controller.putController);
router.delete('/', controller.loggerDelete, controller.deleteController);

router.get('/:id', controller.getUno)

module.exports = router;
