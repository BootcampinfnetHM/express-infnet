const { Sequelize } = require('sequelize');
const UserModel = require('../models/UserModel');
const GenericController = require('./GenericController');
const Op = Sequelize.Op

const MailSClass = require('../utils/Mail'),
      mail = new MailSClass()

const bcryptjs = require('bcryptjs')

class UserController extends GenericController  {

    async getUsers(params) {
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
                    let lowerCaseSearch = params.search
                    lowerCaseSearch.toLowerCase()
                        if(lowerCaseSearch === 'all') {
                            result = await UserModel.findAll(paramsLimit)
                        }
                        else {
                            result = await UserModel.findAll({
                                where: {
                                    name: {
                                        [Op.like]: `%${params.search}%`,
                                    },
                                },
                                order: order,
                                ...paramsLimit,                           
                        })
                        } 
                        return {
                            result,
                            status: 200,
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
                            msg: 'Nenhum usuáiro com ID foi encontrado.',
                            result: await UserModel.findAll(paramsLimit)
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


    async getUser(id) {
        try{           
                if(id == null || id == undefined || id == ''){
                    let result = {
                        status: 500,
                        result: {},
                        msg: 'Digite um código para ser pesquisado'
                    }
                    return result
                }
                else {
                    let result = await UserModel.findByPk(id)    
                    return result;
                }
            }
            catch(err){

                return result = {
                        status: 500,
                        result: {},
                        msg: '(Erro) 500: ' + err.toString()
                    }  
            }
    }
    async createUser(data) {
        try{
            

            data.password = bcryptjs.hashSync(data.password, 10)
            data.token = this.generatePin()
            const novoUsuario = await UserModel.create(data)

            let html = `
            <h1> Confirmação de email </h1>
            // <p> Código de confirmação de email: ${data.token} </p>`
    
            // mail.sendEmail(data.email, "Validação de email", html)

            return {
                status: 200,
                result: `Novo usuário ${novoUsuario.username} criado com sucesso` 
            }
        }
        catch(err) {
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }

    }

    async updateUser(id, data) {
        try{
            await UserModel.update(data, {
                where: {
                    id: id
                }
            })
            return {
                
                status:200,
                result: `Usuário ${id} uatualizado com sucesso`
            }
        } 
        catch(err){
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }

    }
    async deleteUser(id) {
        try {
            await UserModel.destroy({
                where: {
                    id: id,
                }
            })
            return `Usuário ${id} deletado com sucesso` 
        }
        catch(err){
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }
        
    } 

}

module.exports = UserController