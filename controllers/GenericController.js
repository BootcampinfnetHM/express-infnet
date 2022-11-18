const { Sequelize } = require('sequelize');


class GenericController {
    generatePagination(params) {
        const 
              limit = params.limit ? parseInt(params.limit) : 100,
              page = params.limit ? parseInt(params.page) - 1 : 0
              return [limit, page]
    }

    generateOrder(params) {
        let order = [Sequelize.literal('"id"'), 'DESC']

        if (params.order) {
            order = params.order.split(",")

        }

        return [order]
    }
}



module.exports = GenericController