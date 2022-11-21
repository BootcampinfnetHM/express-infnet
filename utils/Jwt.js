const jwt = require('jsonwebtoken')
require("dotenv").config()
class Jwt {
    // constructor(data) {
    //     this.data = data
    // }

    generateToken(data) {
        let token = jwt.sign(
            {
            data:  data,           
            },

            process.env.SECRET_KEY,

            {
            expiresIn: '1h',
            algorithm: 'HS256'
            }
            )
            console.log(token)
        return token  
    }

    verifyToken(token) {
        if(token === null) {
            return {
                result: 'Você p´recisa passar um token',
                status: 400
            }
        }
        token = token.toString().replace("jwt ", "")
        try {
            return {
                result: jwt.verify(token, process.env.SECRET_KEY),
                status: 200
            }
        }
        catch(err){
            if(err.toString(err) === 'TokenExpiredError: jwt expired') {
                return {
                    result: 'Token expirado, faça o login novamente',
                    status: 401,
                }             
            }
            else {
                return {
                    result: err,
                    status: 500,
                }
            }
        }
    }
}

module.exports = Jwt