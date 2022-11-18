const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db')

const UserModel = db.define("user", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrmenet: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.NUMBER,
        allowNull: false,

    },
    email: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true
    },
    // role: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue: 2
    // }
})

module.exports = UserModel