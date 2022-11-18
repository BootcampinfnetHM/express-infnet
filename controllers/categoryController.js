const CATEGORIES = {
        1: {marca: 'Nike'},
        2: {marca: 'Adidas'},
        3: {marca: 'Puma'},
        4: {marca: 'Off-White'},
        5: {marca: 'balenciaga'},
        6: {marca: 'Gucci'},
        7: {marca: 'Versace'},
        8: {marca: 'Prada'}
}

const { Sequelize } = require('sequelize')
const CategoryModel = require('../models/CategoryModel')
const GenericController = require('./GenericController')
const Op = Sequelize.Op


// extends GenericController

class CategoryController extends GenericController {
    // constructor(){
    //     super()
    // }

    async getCategories(params) {
        try{
                let result;
                const pagination = this.generatePagination(params),
                      limit = pagination[0],
                      page = pagination[1]
                
                const paramsLimit = {
                    offset: page * limit,
                    limit: parseInt(limit)
                }

                const order = this.generateOrder(params)

            if (params.search) {
                console.log(params.search)
                let lowerCaseSearch = params.search
                lowerCaseSearch.toLowerCase()
                if(lowerCaseSearch === 'all') {
                    result = await CategoryModel.findAll(paramsLimit)
                }
                else {
                    result = await CategoryModel.findAll({
                        where: {
                            marca: {
                                [Op.like]: `%${params.search}%`,
                            },
                        },
                        ...paramsLimit,
                        ...order

                })
                }
                
            }
            
            if(params.search == '' || params.search == undefined || params.search == null ) {
                    let result = {
                            status: 500,
                            result: {},
                            msg: 'Digite um código válido a ser pesquisado'
                        }
                    return result
            }
            
            if (result.length < 1) {
                    result = {
                        status: 500,
                        msg: 'Nenhuma categoria foi encontrado, veja as opções disponíveis',
                        result: await CategoryModel.findAll(paramsLimit)
                    }
                }    
            return result
        }
        catch(err) {
                let result = {
                        status: 500,
                        result: {},
                        msg: '(Erro) 500' + err.toString()
                    }
                return result   
        }    
    }

    async getCategory(id) {
        try {
            const result = await CategoryModel.findByPk(id)
            
            if(id == '' || id == undefined || id == null ) {
                let result = {
                        status: 500,
                        result: {},
                        msg: 'Digite um código válido a ser pesquisado'
                    }
            }


            return result;
        }
        catch(err){
            return {
                status: 500,
                result: {}
            }
        }
        
    }

    async createCategory(reqBody) {
        try {           
            // console.log(testeErro)
            let result = await CategoryModel.create(reqBody)
            return result = {
                status: 200,
                msg: `categoria ${result.id} criada`
            }           
        }
        catch(err) {
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }      
    }

    async updateCategory(id, data) {
        try {
            await CategoryModel.update(data, {
                where: {
                    id: id
                }
            })
            return {
                status: 200,
                msg: `Categoria ${id} alterada com sucesso.`
            }
        }
        catch(err) {
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }
    }

    async deleteCategory(id) {
        try {
            await CategoryModel.destroy({
                where: {
                    id: id
                }
            })        
            return {
                status: 200,
                msg: `Deletando a categoria ${id}`
            }
        }
        catch(err) {
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }
    } 
}

module.exports = CategoryController