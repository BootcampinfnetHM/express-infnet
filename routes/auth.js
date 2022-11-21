const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')

const authCtrl = new AuthController()

router.post("/login", async (req, res) => {
   const result = await authCtrl.login(req.body.userEmail, req.body.password)
   res.statusCode = result.status
   res.send(result)
})

router.post("/register", async (req, res) => {
   const result = await authCtrl.register(req.body)
    res.statusCode = result.status
    res.send(result.result)
 })   

 router.post("/recovery", async (req, res) => {
   const result = await authCtrl.recoveryPassword(req.body.email) 
   res.statusCode = result.status
   res.send(result.result)
})

router.post("/confirm-recovery", async (req, res) => {
   const result = await authCtrl.confirmRecovery(req.body.token, req.body.password)
   res.statusCode = result.status
   res.send(result.result)
})



module.exports = router



