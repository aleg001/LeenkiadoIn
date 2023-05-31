const express = require('express')
const UserController = require('../controllers/usersController.js')

const router = express.Router()
router.post('/users', UserController.createUser)

module.exports = router