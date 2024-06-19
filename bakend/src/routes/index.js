const express = require('express');

const router = express.Router()

const categoriesRoutes = require('./api/v1/categories.routes');
const subcategoriesRoutes = require('./api/v1/subcategories.routes');
const productRoutes = require('./api/v1/product.routes')

router.use('/categories', categoriesRoutes);
router.use('/subcategories', subcategoriesRoutes);
router.use('/products', productRoutes);

module.exports = router