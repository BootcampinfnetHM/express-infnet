const express = require('express');
const path = require('path')
const app = express()
const port = 3001
const db = require('./db.js')

const user = require('./routes/user')
const auth = require('./routes/auth')
const product = require('./routes/product')
const category = require('./routes/category')


app.use(express.json())
app.use('/user', user)
app.use('/auth', auth)
app.use('/product', product)
app.use('/category', category)


db.sync(() => console.log("banco de dados rodando"))
app.listen(port, () => {
    console.log('App rodando')
    
})

