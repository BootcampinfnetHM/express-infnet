const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController')

const userCtrl = new UserController()


router.get ('/', async (req, res) => {
    let result = await userCtrl.getUsers(req.query)
    res.send(result)
})

router.get ('/:id', async (req, res) => {
    let result = await userCtrl.getUser(req.params.id)
    res.send(result)
})

router.post ('/', async (req, res) => { 
    let result = await userCtrl.createUser(req.body)
    res.send(result)
})

router.patch ('/:id', async (req, res) => { 
    let result = await userCtrl.updateUser(req.params.id, req.body)
    res.send(result)
})

router.delete ('/:id', async (req, res) => { 
    let result = await userCtrl.deleteUser(req.params.id, {})
    res.send(result)
})



module.exports = router