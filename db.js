// import { Sequelize } from "sequelize";
const { Sequelize } = require('sequelize')
require("dotenv").config()

// const dbName = process.env.DB_NAME
// const dbUser = process.env.DB_USER
// const dbHost = process.env.DB_PASSWORD
// const dbPassword = process.env.DB_HOST


// const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
//     host: dbHost,
//     dialect: 'mysql',
// })

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})


// export default sequelize
module.exports = sequelize

// const test = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }

// test()