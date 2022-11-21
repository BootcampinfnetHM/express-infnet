const express = require('express');
const { verify } = require('jsonwebtoken');
const router = express.Router();

const UserController = require('../controllers/userController'),
      userCtrl = new UserController()

const Jwt = require('../utils/Jwt'),
      jwt = new Jwt()


router.get ('/', async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization)
    if(result.status == 200) {
        result = await userCtrl.getUsers(req.query)      
    }

    res.statusCode = result.status
    res.send(result.result)
})

router.get ('/:id', async (req, res) => {
    let result = jwt.verifyToken(req.headers.authorization)
    if(result.status == 200) {
        result = await userCtrl.getUser(req.params.id)
    }
    res.send(result)
})

router.post ('/', async (req, res) => { 
    let result = jwt.verifyToken(req.headers.authorization)
    if(result.status == 200) {
        result = await userCtrl.createUser(req.body)
    }
    res.send(result)
})

router.patch ('/:id', async (req, res) => { 
    let result = jwt.verifyToken(req.headers.authorization)
    if(result.status == 200) {
        result = await userCtrl.updateUser(req.params.id, req.body)
    }
    res.send(result)
})

router.delete ('/:id', async (req, res) => { 
    let result = jwt.verifyToken(req.headers.authorization)
    if(result.status == 200) {
        result = await userCtrl.deleteUser(req.params.id, {}) 
    }
    res.send(result)
})



module.exports = router