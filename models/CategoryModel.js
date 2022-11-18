const Category = require('../models/CategoryModel')
const {Sequelize, DataTypes} = require('sequelize')
const db = require('../db')


const CategoryModel = db.define("category", {
    marca: {
        type: DataTypes.STRING,
        unique: true,
    },

})

module.exports = CategoryModel