const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/categoryController')
const categoriesCtrl = new CategoryController()


router.get ('/', async (req, res) => {
    let result = await categoriesCtrl.getCategories(req.query)
    res.send(result)
})

router.get ('/:id', async (req, res) => {
    let result = await categoriesCtrl.getCategory(req.params.id)
    res.send(result)
})

router.post ('/', async (req, res) => { 
    let result = await categoriesCtrl.createCategory(req.body)
    res.statusCode = result.status
    res.send(result.msg)
})

router.patch ('/:id', async (req, res) => { 
    let result = await categoriesCtrl.updateCategory(req.params.id, req.body)
    res.statusCode = result.status
    res.send(result.msg)
})

router.delete ('/:id', async (req, res) => { 
    let result = await categoriesCtrl.deleteCategory(req.params.id)
    res.statusCode = result.status
    res.send(result.msg)
})

// router.put ('/:id', async (req, res) => { 
//     let result = await categoriesCtrl.updateCategroy(req.params.id, {})
//     res.send('Dados alterados com sucesso!')
// })

module.exports = router