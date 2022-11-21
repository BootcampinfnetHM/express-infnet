const ModelUsuario = require('../models/UserModel')
const bcryptjs = require('bcryptjs')
const { Op }  = require('sequelize')
const Mail = require('../utils/Mail'),
mail = new Mail()
const UserController = require('./userController')
const GenericController = require('./GenericController')
const userFuncs = new UserController

const Jwt = require('../utils/Jwt'),
      jwt = new Jwt()



 class AuthController extends GenericController {

    async login(userEmail, password) {
        const user = await ModelUsuario.findOne({
             where: {               
                [Op.or]: [
                    { username: userEmail },
                    { email: userEmail}
                ]
             }           
        })
        if(user) {
            let token = jwt.generateToken({
                email: user.email,
                username: user.username,
                name: user.name
            })
            let passVerify = bcryptjs.compareSync(password, user.password)
            if(passVerify) {
                return {
                result: "Usuário logado",
                token,
                status: 200
                }
            } 
        }

        return {
            result: 'Usuário não encontrado',
            status: 401
        }
    }

    async register(data) {
        try {
            data.password = bcryptjs.hashSync(data.password, 10)
            const user = await ModelUsuario.create(data)

        return {
                status: 200,
                result: `Usuario ${user.id}, criado com sucesso ` 
            }   
        }
        catch(err) {
            return {
                status: 500,
                result: "(Erro) 500: " + err.toString()
            }
        }
        
    }

    async recoveryPassword(email) {
        const verifyEmail = await ModelUsuario.findOne({
            where: {                      
                   email: email
            }           
       })

       if (verifyEmail) {

        // const generatePin = () => {
        //    let pinGenerator = Math.round(Math.random() * 10000),
        //        pinStr = pinGenerator + ''
        //        console.log(pinStr)

        //     if (pinStr.length === 4){
        //         return pinStr   
        //     }    
        //     generatePin()
        // }

        let token = this.generatePin()

        userFuncs.updateUser(
            verifyEmail.id, {
            token
        })
        let html = `
        <p> Para acessa o link de recuperação de senha,  <a href="http://localhost:3001/auth/confirm-recovery/${token}">clique aqui</a></p>`

        mail.sendEmail(email, "Password recovery", html)

        return {
            status: 200,
            result: "Email enviado"
        }
       }

       return {
        status: 400,
        result: "Email não cadastrado"
       }
        
    }

    async confirmRecovery(token, newPassord) {
        const verifyToken = await ModelUsuario.findOne({
            where: {                      
                   token: token
            }           
       })

       let cryptedPasswpord = bcryptjs.hashSync(newPassord, 10),
           dataPassword = 
           {
            "password": cryptedPasswpord,
            token: null
           }

        if(verifyToken) {
            userFuncs.updateUser(verifyToken.id, dataPassword)
        }
        return {
            status: 200,
            result: 'Senha alterada'
        }
    }
 }

 module.exports = AuthController


 "$2a$10$sG/azo3X6NA4J93D0m25SuBdBviBnkHoZTjiseI2XnIMo//8zKbfW"

 "$2a$10$a1Ehiw43EN7Owbw.VdVuk.tHXBDWFeKjFzj2pEngg4pUrZVqjClzC"