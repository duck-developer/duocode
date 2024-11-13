// const express = require('express')
// const router = express.Router()

// const user_controllers = require('../controllers/user/user_controllers')

// router.get('/user',user_controllers.getAllUser)

// module.exports = router


const express = require('express')
const router = express.Router()
const userController = require('../controllers/user/user_controllers')
const UserMiddlewares = require('../middlewares/user/user_middlewares')

router.get('/user', (request, response) => userController.getAllUsers(request, response))
router.post('/user',
    UserMiddlewares.validationRules,
    (request, response, next) => UserMiddlewares.validate(request, response, next),
    (request, response, next) => UserMiddlewares.verifyEmailUser(request, response, next),
    (request, response) => userController.createUser(request, response))

router.post('/login', (request, response,next) => UserMiddlewares.verifyLoginUser(request, response,next))



module.exports = router;
