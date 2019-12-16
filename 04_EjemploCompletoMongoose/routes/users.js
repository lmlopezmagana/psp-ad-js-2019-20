'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const UserController = require('../controllers/user')

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.put('/upgrade/:id', middleware.ensureAuthenticatedTecnico, UserController.upgrade);


module.exports = router
