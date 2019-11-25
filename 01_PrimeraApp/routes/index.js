var express = require('express');
var router = express.Router();

const controller = require('../controllers/index');

/* router.get('/', (req, res, next) => {
  res.status(200).json({mensaje: "Hola Mundo!"})
});
 */

router.get('/', controller.getController);
router.get('/:id', controller.getUno)

router.post('/', controller.postController);

router.put('/:id', controller.putController);

router.delete('/:id', controller.deleteController);



module.exports = router;
