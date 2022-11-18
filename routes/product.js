const express = require('express');
const router = express.Router();

const ProductController = require('../controllers/productController')

const productCtrl = new ProductController()


router.get ('/', async (req, res) => {
    let result = await productCtrl.getProducts(req.query)
    res.send(result)
})

router.get ('/:id', async (req, res) => {
    let result = await productCtrl.getProduct(req.params.id)
    res.send(result)
})

router.post ('/', async (req, res) => { 
    let result = await productCtrl.createProduct(req.body)
    res.send(result)
})

router.patch ('/:id', async (req, res) => { 
    let result = await productCtrl.updateProduct(req.body, req.body)
    res.send(result)
})

router.delete ('/:id', async (req, res) => { 
    let result = await productCtrl.deleteProduct(req.params.id, {})
    res.send(result)
})



module.exports = router