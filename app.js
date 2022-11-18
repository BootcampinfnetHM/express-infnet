const express = require('express');
const path = require('path')
// objeto que gera o servidor, possibilta o LISTEN e o GET
const app = express()
const port = 3001
const connectLivereload = require('connect-livereload')
const db = require('./db.js')


// renderizando HTML partindo do backend
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req, res) => {
    res.render('index', {
        subject: 'Assunto da página',
        name: 'Nome de alguém'
    })
})


// Sistema de importação de rotas
const user = require('./routes/user')
const auth = require('./routes/auth')
const product = require('./routes/product')
const category = require('./routes/category')
const bodyParser = require('body-parser')

// APP.USE() - Cria o running, possibilita que o aplicativo web exista. 
// express.json() - possibilita que o express leia Jsons, deve ser colocado antes de todos os outros APP.USE()
app.use(express.json())
// Rotas
app.use('/user', user)
app.use('/auth', auth)
app.use('/product', product)
app.use('/category', category)

// app-session. responsável por gerar a informação se o usuário está logado ou não
// a sessão cria um cookie que se mantém enquanto o usuário estiver logado
const session = require('express-session')
// Iniciando a sessão e geração de token via express.
app.use(session({
    secret:`926d2d2a47dcfd880dba0434bd900f0c337d9c124c54276f40cbfdea024b674b
    6628d1a4220b5a3373795b8b`,
    resave: false,
    saveUnitialized: false,
    cookie: { 
        secure: true,
        maxAge: 1000 * 60 * 30
    }})
    )


db.sync(() => console.log("banco de dados rodando"))
app.listen(port, () => {
    console.log('App rodando')
    
})

// const passport = require('passport')
// app.use(passport.initialize())
// app.use(passport.session())

// API REST = foco do curso. 
// o que é app web backend ?
// toda API REST é uma aplicação web backend mas nem toda aplicação backend Web é uma API REST

// app.use(bodyParser.json())
// nodemon > connectLivereload  - atualmente não necessário, basta baixar o nodemon
// app.use(connectLivereload())

// ///////////////////////////////////////////////
// Gera possibilidade de acesso via URL
// TIPOS DE RETORNO --v
// utiliza res.send - ou textplain - retorno de um texto. textHTML - pagina HTML pro servidor - JSON ou XML
// app.get('/', (req, res)=> {
//     try{
//         res.statusCode = 200
//         res.send({
//             msg: 'Sucesso.'
//         })
//     }
//     catch(err) {
//         res.statusCode = 401
//         res.send({
//             msg: err
//         })
//     }
// })
// exemplos de view /\ \/
// app.get('/home', (req, res)=> {
//     res.send('Olá 1º home')
// })
// Conteudo da pasta view
////////////////////////////////////////////////////////////////