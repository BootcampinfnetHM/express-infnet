
const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db')

const Product = db.define("product", {
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
    description: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    images: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,

    }
})

module.exports = Product