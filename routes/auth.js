const express = require('express')
const router = express.Router()
const Mail = require('../utils/Mail')
const AuthController = require('../controllers/authController')

const authCtrl = new AuthController(),
      mail = new Mail()

router.post("/login", async (req, res) => {
   const result = await authCtrl.login(req.body.userEmail, req.body.password)
   res.statusCode = result.status
   res.send(result.result)
})

router.post("/register", async (req, res) => {
   let html = ''

   const result = await authCtrl.register(req.body.email, "Recuperação de senha", html)
    res.statusCode = result.status
    res.send(result.result)
 })   

 router.post("/recovery", async (req, res) => {
   await mail.sendEmail()
   res.send({})
})

module.exports = router

// router.post("/register", async (req, res) => {
//     ls = new localStrategy({
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true
//     }, async (req, email, password, done) => {
//         authCtrl.register(req.body, email, password, done)
//         res.send('usuário criado')
//     })   
// })

// dentro da função ficarão os controllers, para dar ou não permicionamento ao usuário acessar aquilo. vai verificar dados como ID, nome da empresa, nivel de autorização, etc.
// Depois disso, será acessado o banco de dados através da pasta models
// Model são conjuntos de classes identicas as do banco de dados, e por isso eles conseguem se comunicar e pegar informações. Vai no banco e volta com a resposta

// const getUser = async ( req, res) {
//     res.send('Olá mundo');   
// }

// router.get( '/', getUser )

module.exports = router

