const express = require('express');
const { categoriesController } = require('../../../controller');
const upload = require('../../../middleware/upoad');
const routes = express.Router();

routes.get(
    '/:category_id',
    categoriesController.getCategories,
)

routes.get(
    '/',
    categoriesController.listCategories,
)

routes.post(
    '/',
    upload.single('img'),
    categoriesController.addCategories,
)

routes.put(
    '/:category_id',
    upload.single('img'),
    categoriesController.updateCategories,
)

routes.delete(
    '/:category_id',
    categoriesController.deleteCategories,
)

module.exports = routes;