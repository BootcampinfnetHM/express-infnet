const PRODUCTS = {
    33:{  
              
        name: 'Nike Airmax Plus',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images: 'https://cdn.dooca.store/2452/products/dhumzqvrsxkrcsgho93inebnrd84drlzkppj_640x640+fill_ffffff.jpg?v=1658831865&webp=0',

        price: 534.00,
        promo_price: '',
        percent: 15
    },
  12:{  
          
        name: 'Yeezy Zebra',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images: 'https://werare.com.ua/image/cache/catalog/i/co/fc/de252df85fea5061150fe6f2a313e51c-890x1000.jpg',
        price: 665.00,
        promo_price: 465.00,
        percent: 15
    },
 43:{  
          
        name: 'Nike Airmax 97',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images: 'https://maze.cdn.plataformaneo.com.br/produto/multifotos/hd/20210914130954_8269991731_DZ.png',
        price: 407.00,
        promo_price: 350.00,
        percent: 15
    },
  14:{  
          
        name: 'Puma Slipstream',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images:  'https://images.puma.net/images/391763/04/sv01/fnd/BRA/',
        price: 599.00,
        promo_price: 399.00,
        percent: 15
    },
  56:{  
          
        name: 'Balenciaga Triple S',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images: 'https://cdn-images.farfetch-contents.com/12/96/98/30/12969830_13769318_1000.jpg', 
        price: 735.00,
        promo_price: 599.00,
        percent: 15
    },
  61:{  
          
        name: 'Off-White Vulc',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images: 'https://images.tcdn.com.br/img/img_prod/680475/tenis_off_white_vulc_low_top_black_71_1_20190423093244.jpg',
        price: 699.00,
        promo_price: 650.00,
        percent: 15
    },
  75:{  
          
        name: 'Gucci Run',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images: 'https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1649089822/700103_USM10_8970_001_100_0000_Light.jpg',
        price: 899.00,
        promo_price: 599.00,
        percent: 15
    },
  18:{  
          
        name: 'Versace Greca',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images: 'https://bexit.gumlet.io/pub/media/catalog/product/i/m/img_2D_0001_135646.jpg?w=440&h=440&trim=35&mode=fill&pad=30',
        price: 3299.00,
        promo_price: '',
        percent: 15
    },
  39:{  
          
        name: 'Prada Monolith',
        description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam obcaecati, expedita sunt nesciunt, inventore nemo  distinctio?',
        images:'https://www.dhresource.com/0x0/f2/albu/g22/M01/19/94/rBVaEmJPlFeAapGLAAJn6x8eV98386.jpg',
        price: 1299.00,
        promo_price: '',
        percent: 15
    },
}
const { Sequelize } = require('sequelize');
const ProductModel = require('../models/ProductModel');
const GenericController = require('./GenericController');
const Op = Sequelize.Op


class ProductController extends GenericController  {
 
    async getProducts(params) {
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
                            result = await ProductModel.findAll(paramsLimit)
                        }
                        else {
                            result = await ProductModel.findAll({
                                where: {
                                    name: {
                                        [Op.like]: `%${params.search}%`,
                                    },
                                },
                                order: order,
                                ...paramsLimit,
                                

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
                            msg: 'Nenhum produto com esse nome foi encontrado, veja outras opções',
                            result: await ProductModel.findAll(paramsLimit)
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


    async getProduct(id) {
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
                    let result = await ProductModel.findByPk(id)    
                    return result;
                }
            }
            catch(err){
                let result; 
                console.log(err + 'oi')
                return result = {
                        status: 500,
                        result: {}
                    }  
            }
    }
    async createProduct(data) {
        try{
            const novoProduto = await ProductModel.create(data)
            return `Novo produto ${novoProduto.id} criado com sucesso` 
        }
        catch(err) {
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }

    }

    async updateProduct(id, data) {
        try{
            await ProductModel.update(data, {
                where: {
                    id: id
                }
            })
            return `Produto ${id} uatualizado com sucesso`
        } 
        catch(err){
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }

    }
    async deleteProduct(id) {
        try {
            await ProductModel.destroy({
                where: {
                    id: id,
                }
            })
            return `Produto ${id} deletado com sucesso` 
        }
        catch(err){
            return {
                status: 500,
                msg: '(Erro) 500: ' + err.toString()
            }
        }
        
    } 

}

module.exports = ProductController