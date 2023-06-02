const express = require('express')
const UserController = require('../controllers/usersController.js')
const FriendController = require('../controllers/friendsController.js')
const CommunityController = require('../controllers/communityController.js')

const router = express.Router()
router.post('/users', UserController.createUser)
router.get('/users', UserController.getUsers)
router.post('/userslogin', UserController.getUser)
router.post('/userupdate', UserController.editProperties)
router.post('/getcollege', UserController.getCollege)
router.post('/getfriends', FriendController.getFriends)
router.post('/removefriend', FriendController.removeFriend)
router.post('/getnofriends', FriendController.getUsers)
router.post('/addfriend', FriendController.addFriend)
router.post('/setcommunity', CommunityController.addCommunity)

module.exports = router
