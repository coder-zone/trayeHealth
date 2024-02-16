const express = require("express");
const router = express.Router();


const productController = require("../controller/productController");

const checkAuth = require('../middleware/validation');

router.post('/add-product', checkAuth, productController.addproduct);
router.get('/products-list', checkAuth, productController.allProducts)
router.get('/products/:productId', checkAuth, productController.retrieveProduct)
router.put('/update-product/:productId', checkAuth, productController.updateProduct)
router.delete('/delete-product/:productId', checkAuth, productController.deleteProduct)




module.exports = router;