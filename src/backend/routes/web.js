const express = require('express')
const UserController = require('../controllers/usersController.js')
const FriendController = require('../controllers/friendsController.js')

const router = express.Router()
router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.post('/userslogin', UserController.getUser)
router.post('/userupdate', UserController.editProperties)
router.post('/getcollege', UserController.getCollege)
router.post('/getfriends', FriendController.getFriends)

module.exports = router
