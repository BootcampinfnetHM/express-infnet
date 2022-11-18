const ModelUsuário = require('../models/UserModel')
const bcryptjs = require('bcryptjs')
const { Op }  = require('sequelize')
 
 class AuthController {

    async login(userEmail, password) {
        console.log(userEmail, password)
        const user = await ModelUsuário.findOne({
             where: {               
                [Op.or]: [
                    { username: userEmail },
                    { email: userEmail}
                ]
             }           
        })
        
        if(user) {
            let passVerify = bcryptjs.compareSync(password, user.password)
            if(passVerify) {
                return {
                result: "Usuário logado",
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
            const user = await ModelUsuário.create(data)

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
 }

 module.exports = AuthController