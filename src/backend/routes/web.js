const express = require('express')
const UserController = require('../controllers/usersController.js')

const router = express.Router()
router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.post('/userslogin', UserController.getUser)

module.exports = router
