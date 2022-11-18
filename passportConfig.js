const passport = require('passport')
const db = require("./db")
const User = require('./models/UserModel')


passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passowordField: 'password',
    passwordReqToCallback: true
}, async (req, login, password, done) => {
    const result = await User.find({
        where: {
            username: req.body.username
        }
    }) 
    if(result) {
        console.log('Ousuário existe')
        done(null, result)
    }
    else {
        console.log('Ousuário não existe')
        done(null, false, {message: 'Usuário ou senha incorretos'})
        
    }
}))