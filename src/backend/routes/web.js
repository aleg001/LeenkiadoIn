const express = require('express')
const UserController = require('../controllers/usersController.js')

const router = express.Router()
router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)

module.exports = router
